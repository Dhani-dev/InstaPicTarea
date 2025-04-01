import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogged = signal(false);

  login(username:string, password:string):boolean{
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
