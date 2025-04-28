import { Component, inject, OnInit } from '@angular/core';
import { TokenService } from '../../shared/services/token.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  tokenService = inject(TokenService);

  username = '';

  ngOnInit(): void {
    this.username = this.tokenService.decodeToken()?.username||'Bienvenido!';
  }

}
