import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { Observable, tap } from 'rxjs';

@Injectable()
export class TimeInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // performance.now() return a time value in milliseconds
    const startTime = performance.now();
    // Method intercept() is observable. These allow working with operators rxjs
    return next.handle(request).pipe(
      tap(() => {
        const time = (performance.now() - startTime) + 'ms'
      })
    );
  }
}

export const TimeInterceptorConfig = {
  provide: HTTP_INTERCEPTORS,
  useClass: TimeInterceptor,
  multi: true,
};
