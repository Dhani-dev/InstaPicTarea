import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);
  tokenService = inject(TokenService);

  private URL_BASE = 'http://localhost:3000/api/v1/user';

  update(userId: string, name?: string | null, email?: string | null) {
    return this.http.patch(`${this.URL_BASE}/${userId}`, { name, email }, this.getHeaders(this.tokenService.getToken()!));
  }

  private getHeaders(token: string) {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

}
