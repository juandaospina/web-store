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
    return this._http.post<User>(`${environment.baseUrl}/users`, data).pipe(
      catchError((error: HttpErrorResponse): Observable<never> => {
        console.log('[error_create_user]', error.error.message);
        if (error.status === 400) {
          return throwError(() => 'Verifique la información ingresada')
        }
        if (error.status === 401) {
          return throwError(() => 'Algo malo ocurrió');
        }
        return throwError(
          () => 'Algo malo paso, intente de nuevo en un momento'
        );
      })
    );
  }

  getAll(): Observable<User[]> {
    return this._http.get<User[]>(`${environment.baseUrl}/api/users`);
  }
}
