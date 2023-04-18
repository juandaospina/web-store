import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
  HttpContextToken,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const TOKEN_HANDLE = new HttpContextToken<string>(() => 'notoken');

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // if (request.context.get(TOKEN_HANDLE) === 'token') {
    //   console.log("[auth_interceptor]");
    //   const token: string = window.localStorage.getItem('token') ?? '';
    //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //   request = request.clone({ headers });
    //   return next.handle(request);
    // }
    // return next.handle(request);
    return next.handle(request);
  }
}

export const AuthInterceptorConfig = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
