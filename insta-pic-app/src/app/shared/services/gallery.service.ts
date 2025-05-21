import { inject, Injectable, signal } from '@angular/core';
import { GalleryItem } from '../interfaces/gallery-item.interface';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, from, Observable, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  tokenService = inject(TokenService);
  http = inject(HttpClient)

  private supabase: SupabaseClient;

  private BUCKET_NAME = 'instapic';
  private URL_BASE_STORAGE = 'https://xzrfphwrkqdlzdxybyli.supabase.co/storage/v1/object/public';
  private URL_BASE_SERVICE = 'http://localhost:3000/api/v1/photo';

  constructor() {
    this.supabase = createClient(
      'https://xzrfphwrkqdlzdxybyli.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6cmZwaHdya3FkbHpkeHlieWxpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Nzg0OTg0NiwiZXhwIjoyMDYzNDI1ODQ2fQ.cEytHtj1n93i5EF9vC0rzRi6ZTcyPD1jxNiQPa2Exb4',
      {
        db: { schema: 'public' },
        auth: { persistSession: true },
        global: { fetch: fetch.bind(window) }
      }
    );
  }

  private _gallery = signal<GalleryItem[]>(
    [{
      id: '1',
      url: './assets/gallery0.jpg',
      comments: []
    },
    {
      id: '2',
      url: './assets/gallery1.jpg',
      comments: []
    },
    {
      id: '3',
      url: './assets/gallery2.webp',
      comments: []
    },
    {
      id: '4',
      url: './assets/gallery3.jpeg',
      comments: []
    },
    {
      id: '5',
      url: './assets/gallery4.jpg',
      comments: []
    },
    {
      id: '6',
      url: './assets/gallery6.jpg',
      comments: []
    },
    {
      id: '7',
      url: './assets/gallery7.jpg',
      comments: []
    },
    {
      id: '8',
      url: './assets/gallery8.webp',
      comments: []
    },
    {
      id: '9',
      url: './assets/gallery9.avif',
      comments: []
    }]
  )

  getByUser(username: string) {

    return this._gallery;

  }

    upload(file: File, fileName: string): void {
    const user = this.tokenService.decodeToken();
    if (!user || this.tokenService.isTokenExpired()) {
      console.error('User not authenticated or token expired');
      return;
    }

    this.uploadFileToSupabase(file, fileName, user.username)
      .pipe(
        switchMap((supabaseResponse) => {
          if (supabaseResponse.data) {
            const url = `${this.URL_BASE_STORAGE}/${this.BUCKET_NAME}/${user.username}/${fileName}`;
            const body = { url, userId: user.id };
            return this.postPhotoToBackend(body);
          } else if (supabaseResponse.error) {
            return throwError(() => new Error(`Supabase Storage Upload Error: ${supabaseResponse.error.message}`));
          }
          return throwError(() => new Error('Supabase upload response data is null.'));
        }),
        switchMap(() => this.getPhotosFromBackend(user!.id)),
        tap((backendPhotos) => {
          console.log('GET successful, updating gallery:', backendPhotos);
          const gallery = backendPhotos.map(item => ({
            id: item.id,
            url: item.url,
            username: item.user.username,
            comments: [] 
          }));
          this._gallery.set(gallery);
        }),
        catchError((err) => {
          console.error('Full upload process failed:', err);
          return throwError(() => err); 
        })
      )
      .subscribe({
        next: () => console.log('Photo upload and gallery update complete.'),
        error: (err) => console.error('Upload subscription error:', err)
      });
  }

  private uploadFileToSupabase(file: File, fileName: string, username: string): Observable<any> {
    console.log(`Uploading file to Supabase: ${username}/${fileName}`);
    return from(this.supabase.storage
      .from(this.BUCKET_NAME)
      .upload(`${username}/${fileName}`, file));
  }

  private postPhotoToBackend(body: { url: string, userId: string }): Observable<any> {
    const token = this.tokenService.getToken();
    if (!token) {
      return throwError(() => new Error('Authentication token not found for POST.'));
    }
    console.log('Making POST request to backend with body:', body);
    return this.http.post(this.URL_BASE_SERVICE, body, this.getHeaders(token)).pipe(
      tap((response) => console.log('Backend POST successful:', response)),
      catchError((err) => {
        console.error('Backend POST error:', err);
        return throwError(() => err);
      })
    );
  }

  private getPhotosFromBackend(userId: string): Observable<any[]> {
    const token = this.tokenService.getToken();
    if (!token) {
      return throwError(() => new Error('Authentication token not found for GET.'));
    }
    console.log(`Workspaceing photos from backend for user ID: ${userId}`);
    return this.http.get<any[]>(`${this.URL_BASE_SERVICE}/${userId}`, this.getHeaders(token)).pipe(
      tap((response) => console.log('Backend GET successful:', response)),
      catchError((err) => {
        console.error('Backend GET error:', err);
        return throwError(() => err);
      })
    );
  }

  deleteById(photoId: string) {
    const user = this.tokenService.decodeToken();
    if (!user || this.tokenService.isTokenExpired()) {
      console.error('User not authenticated or token expired');
      return;
    }

    const photoToDelete = this._gallery().find(item => item.id === photoId);

    if (!photoToDelete) {
      console.error(`Photo with ID ${photoId} not found in local gallery.`);
      return;
    }

    const parts = photoToDelete.url.split('/');
    const pathInStorage = parts.slice(parts.indexOf(this.BUCKET_NAME) + 1).join('/');

    console.log('Attempting to delete photo with ID:', photoId);
    console.log('Path in Supabase Storage:', pathInStorage);

    this.http.delete(`${this.URL_BASE_SERVICE}/${photoId}`, {
      ...this.getHeaders(this.tokenService.getToken()!),
      responseType: 'text' as 'json' 
    })
      .pipe(
        tap((res) => { 
          console.log('Successfully deleted photo from backend database. Response:', res);
        }),
      )
      .subscribe({
        next: () => {
          this._gallery.update(items => items.filter(item => item.id !== photoId));
          console.log(`Photo with ID ${photoId} successfully deleted and removed from gallery.`);
        },
        error: (err) => {
          console.error('Error during photo deletion:', err);
        }
      });
  }

  addCommentById(comment: string, id: string) {
    this._gallery.update(items =>
      items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            comments: [...item.comments, { message: comment }]
          };
        }
        return item;
      })
    );
  }

  private getHeaders(token: string) {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

}
