import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpHeaders,
  HttpContextToken,
  HttpContext,
} from '@angular/common/http';
import { Observable } from 'rxjs';

const ACCESS_TOKEN_HANDLE = new HttpContextToken(() => false);

export function applyToken() {
  return new HttpContext().set(ACCESS_TOKEN_HANDLE, true)
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.context.get(ACCESS_TOKEN_HANDLE)) {
      console.log('[auth_interceptor]');
      const token: string = window.localStorage.getItem('token') ?? '';
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      request = request.clone({ headers });
      return next.handle(request);
    }
    return next.handle(request);
  }
}

export const TokenInterceptorConfig = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};
