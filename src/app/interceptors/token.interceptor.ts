import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("[token_service]")
    // const token: string = window.localStorage.getItem("token") ?? '';
    const token = this.tokenService.getToken();
    let headers;
    if (token) {
      console.log("[hasToken]", token);
      headers = new HttpHeaders().set(
        "Authorization", `Bearer ${token}`
      );
    }
    request = request.clone({ headers });
    return next.handle(request);
  }
}

export const TokenInterceptorConfig = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
}
