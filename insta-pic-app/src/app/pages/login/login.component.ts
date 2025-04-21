import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  router = inject(Router);

  authService = inject(AuthService);

  fb = inject(FormBuilder);

  loginForm = this.fb.group({
    username:['', [Validators.required, Validators.minLength(6)]],
    password:['', [Validators.required]]
  })



  onLogin(){
    if(this.loginForm.invalid){
      Swal.fire({
        text:'Diligencie todos los campos',
        icon:'error'
      })
      return;
    }

    const {username, password } = this.loginForm.value;

    this.authService.login(username!, password!).subscribe({
      next:(response)=>{
        if (response.success){
          this.router.navigateByUrl('home');
        }
      },
      error:(error)=>{
        Swal.fire({
          text:'Credenciales incorrectas',
          icon:'error'
        })
      }
    });




    /* if (success){
      this.router.navigateByUrl('home');
    }


    const success2 = await this.authService.login2(username!, password!);
    if (success) {
      this.router.navigateByUrl('home');
    } else {
      Swal.fire({
        text:'Credenciales incorrectas',
        icon:'error'
      })
    }*/

  }

}
