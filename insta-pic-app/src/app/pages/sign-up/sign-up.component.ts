import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  router = inject(Router);

  fb = inject(FormBuilder);

  passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    return password === rePassword ? null : { passwordsMismatch: true };

  };

  signUpForm = this.fb.group({
    name:['', [Validators.required, Validators.minLength(6)]],
    username:['', [Validators.required]],
    email:['', [Validators.email]],
    password:['', [Validators.required]],
    rePassword:['']
  }, { validators: this.passwordsMatchValidator })


  onRegistry(){

    if(this.signUpForm.invalid){
      alert('Diligencie todos los campos');
      return;
    }

    const {rePassword:_, ...user} = this.signUpForm.value;

    localStorage.setItem(user.username!, JSON.stringify(user));

    this.router.navigateByUrl('home');

  }




}
