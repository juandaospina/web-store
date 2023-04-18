import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { Observable, tap } from 'rxjs';

const CHECK_TIME = new HttpContextToken<boolean>(() => false);

export function checkTime() {
  return new HttpContext().set(CHECK_TIME, true);
}

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
    if (request.context.get(CHECK_TIME)) {
      return next.handle(request).pipe(
        tap(() => {
          const time = (performance.now() - startTime) + 'ms'
          console.log("[time_interceptor]", time);
        })
      );
    }
    return next.handle(request);
  }
}

export const TimeInterceptorConfig = {
  provide: HTTP_INTERCEPTORS,
  useClass: TimeInterceptor,
  multi: true,
};
