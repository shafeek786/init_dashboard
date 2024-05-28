import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<string>,
    next: HttpHandler
  ): Observable<HttpEvent<string>> {
    const userToken = localStorage.getItem('token');

    if (window.location.pathname.includes('/') && userToken) {
      return this.handleRequestWithToken(req, userToken, next);
    } else {
      return next.handle(req);
    }
  }

  private handleRequestWithToken(
    req: HttpRequest<any>,
    token: string,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next.handle(modifiedReq).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }
}
