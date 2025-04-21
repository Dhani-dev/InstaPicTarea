import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../interfaces/login-response.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);

  constructor() { }

  isLogged = signal(false);

  login(username: string, password: string): Observable<LoginResponse> {

    return this.http.post<LoginResponse>('http://localhost:3000/api/v1/auth/login', { username, password }).pipe(
      tap({
        next: (response) => console.log(response),
        error: (error) => console.error('Error', error),
        complete: () => console.log('Terminado')
      }));

    /*


    this.http.post<LoginResponse>('http://localhost:3000/api/v1/auth/login', {username, password}).subscribe({
      next: (response)=> console.log(response),
      error: (error)=> console.error('Error', error),
      complete: () => console.log('Terminado')
    });


    const userSrt = localStorage.getItem(username);
    if(userSrt){
      const userDB:User = JSON.parse(userSrt);
      if(password===userDB.password){
        this.isLogged.update(()=>true);
        return true;
      }
    }
    Swal.fire({
      text:'Credenciales incorrectas',
      icon:'error'
    })
    return false;
    */

  }

  async login2(username: string, password: string): Promise<boolean> {
    try {
      const response = await this.http.post<LoginResponse>('http://localhost:3000/api/v1/auth/login', { username, password }).toPromise();
      console.log(response);
      return true;
    } catch (error) {
      console.error('Error', error);
      return false;
    }
  }

  logout() {
    this.isLogged.update(() => false);
  }

  registry(user: User): boolean {
    const userSrt = localStorage.getItem(user.username);

    console.log(userSrt)
    if (userSrt) {
      Swal.fire({
        text: `Usuario ${user.username} ya existe`,
        icon: 'error'
      });
      return false;
    }
    localStorage.setItem(user.username, JSON.stringify(user));
    this.isLogged.update(() => true);
    return true;
  }


}
