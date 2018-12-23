import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  setToken(token) {
    this.cookieService.set('auth-token', token);
  }

  getToken() {
    return this.cookieService.get('auth-token');
  }

  deleteToken() {
    this.cookieService.delete('auth-token');
  }
}
