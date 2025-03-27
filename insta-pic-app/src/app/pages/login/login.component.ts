import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  router = inject(Router)

  fb = inject(FormBuilder);
  loginForm = this.fb.group({
    username:['', [Validators.required, Validators.minLength(6)]],
    password:['', [Validators.required]]
  })



  onLogin(){
    if(this.loginForm.invalid){
      alert('Diligencie todos los campos');
      return;
    }

    const {username, password } = this.loginForm.value;

    const userSrt = localStorage.getItem(username!);

    if (!userSrt){
      alert('Ingreso no valido');
      return;
    }

    const user = JSON.parse(userSrt);

    if(password!==user.password){

      alert('Ingreso no valido');
      return;
    }
    this.router.navigateByUrl('home');

  }

}
