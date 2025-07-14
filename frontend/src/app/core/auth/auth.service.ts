import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private TOKEN_KEY = 'jwt-token';

  get token(): string|null { return localStorage.getItem(this.TOKEN_KEY); }
  set token(t: string|null) { t ? localStorage.setItem(this.TOKEN_KEY, t) : localStorage.removeItem(this.TOKEN_KEY); }

  isLoggedIn(): boolean { return !!this.token; }
  logout() { this.token = null; }
}