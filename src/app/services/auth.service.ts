import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Dependencies
  private _http = inject(HttpClient);
  constructor() {}

  login(email: string, password: string) {
    return this._http.post(`${environment.baseUrl}/api/auth/login`, {
      email,
      password,
    });
  }

  getProfile(token: string) {
    return this._http.get(`${environment.baseUrl}/api/profile`);
  }
}
