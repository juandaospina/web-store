import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CreateUser, User } from '../types/user';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // Dependencies
  private _http = inject(HttpClient);

  constructor() {}

  /*
    These methods allow access a server resources of users
  */
  create(data: CreateUser): Observable<User> {
    return this._http.post<User>(`\${environment.baseUrl}/user`, data).pipe(
      catchError((error: HttpErrorResponse, caught: Observable<User>) => {
        if (error.status === 401) {
          return throwError(() => 'Algo malo ocurrió');
        }
        return caught;
      })
    );
  }

  getAll(): Observable<User[]> {
    return this._http.get<User[]>(`${environment.baseUrl}/api/users`);
  }
}
