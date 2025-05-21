import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { TokenService } from '../../shared/services/token.service';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  router = inject(Router);
  fb = inject(FormBuilder);
  userService = inject(UserService);
  tokenService = inject(TokenService);

  profileForm = this.fb.group({
    name: ['', [Validators.minLength(6)]],
    email: ['', [Validators.email]]
  })

  onUpdate(){
     const user = this.tokenService.decodeToken();
    if(this.profileForm.valid && user){
      const { name, email} = this.profileForm.value;
      this.userService.update(user.id, name, email)
        .subscribe(response=>{
          this.router.navigateByUrl('home');
        });
    }

  }

}
