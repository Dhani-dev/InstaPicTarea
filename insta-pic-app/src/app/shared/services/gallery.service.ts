import { Injectable, signal } from '@angular/core';
import { GalleryItem } from '../interfaces/gallery-item.interface';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private _gallery = signal<GalleryItem[]>(
    [{
      id:'1',
      url:'./assets/gallery0.jpg',
      comments:[]
    },
    {
      id:'2',
      url:'./assets/gallery1.jpg',
      comments:[]
    },
    {
      id:'3',
      url:'./assets/gallery2.webp',
      comments:[]
    },
    {
      id:'4',
      url:'./assets/gallery3.jpeg',
      comments:[]
    },
    {
      id:'5',
      url:'./assets/gallery4.jpg',
      comments:[]
    },
    {
      id:'6',
      url:'./assets/gallery6.jpg',
      comments:[]
    },
    {
      id:'7',
      url:'./assets/gallery7.jpg',
      comments:[]
    },
    {
      id:'8',
      url:'./assets/gallery8.webp',
      comments:[]
    },
    {
      id:'9',
      url:'./assets/gallery9.avif',
      comments:[]
    }]
  )

  getByUser(username:string){

    return this._gallery;

  }

  deleteById(id:string){
    this._gallery.update(items=>items.filter(item => item.id !== id))
  }

  addCommentById(comment: string, id: string) {
    this._gallery.update(items =>
      items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            comments: [...item.comments, {message:comment}]
          };
        }
        return item;
      })
    );
  }

}
