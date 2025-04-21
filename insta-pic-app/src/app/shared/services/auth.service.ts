import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);

  constructor() { }

  isLogged = signal(false);

  login(username:string, password:string):boolean{

    this.http.post<LoginResponse>('http://localhost:3000/api/v1/auth/login', {username, password}).subscribe({
      next: (response)=> console.log(response),
      error: (error)=> console.error(error),
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

  }

  logout(){
    this.isLogged.update(()=>false);
  }

  registry(user:User):boolean{
    const userSrt = localStorage.getItem(user.username);

    console.log(userSrt)
    if(userSrt){
      Swal.fire({
        text:`Usuario ${user.username} ya existe`,
        icon:'error'
      });
      return false;
    }
    localStorage.setItem(user.username, JSON.stringify(user));
    this.isLogged.update(()=>true);
    return true;
  }


}
