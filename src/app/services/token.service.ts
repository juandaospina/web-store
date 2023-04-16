import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  public saveToken(token: string) {
    window.localStorage.setItem('token', token);
  }

  public getToken() {
    return window.localStorage.getItem('token');
  }
}
