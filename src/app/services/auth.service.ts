import { Injectable, inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { applyToken } from '../interceptors/token.interceptor';
import { AuthToken } from '../types/auth';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  // Dependencies
  private _http = inject(HttpClient);
  // Properties
  public token$ = new EventEmitter<string>();
  public userProfile$ = new EventEmitter<User>();

  /*
    These methods allow to handle process of login, authentication, profile
  */

  public login(email: string, password: string) {
    return this._http.post<AuthToken>(`${environment.baseUrl}/auth/login`, {
      email,
      password,
    });
  }

  public getProfile() {
    return this._http.get<User>(`${environment.baseUrl}/auth/profile`, {
      context: applyToken()
    });
  }

  public hasUser() {
    console.log("[user$]", this.userProfile$)
    return this.userProfile$ ? true : false;
  }
}
