import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HTTP_INTERCEPTORS,
    HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, switchMap, throwError } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = localStorage.getItem('access_token');
        if (token && !req.headers.has('authorization')) {
            authReq = req.clone({ setHeaders: { authorization: `Bearer ${token}` } });
        }
        return next.handle(authReq).pipe(
            catchError((error) => {
                if (
                    error instanceof HttpErrorResponse &&
                    error.status === 401 &&
                    !req.url.includes('login') &&
                    !req.url.includes('register')
                ) {
                    console.log('User is not authenticated, redirecting to login page.');
                    this.router.navigate(['/login']);
                }
                return throwError(() => error);
            })
        );
    }
}

export const httpInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];