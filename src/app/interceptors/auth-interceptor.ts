import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const skipUrls = ['/login', '/refresh'];

  if (skipUrls.some(url => req.url.includes(url))) {
    return next(req);
  }

  const accessToken = authService.getAccessToken();

  let authReq = req;

  if (accessToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {

        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          return authService.refreshToken().pipe(

            switchMap((res: any) => {
              isRefreshing = false;

              const newAccessToken = res.accessToken;

              refreshTokenSubject.next(newAccessToken);

              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`
                }
              });

              return next(retryReq);
            }),

            catchError((err) => {
              isRefreshing = false;
              authService.clearTokens();
              authService.isLoggedIn.set(false);
              router.navigate(['/login']);
              return throwError(() => err);
            })
          );
        }

        return refreshTokenSubject.pipe(
          filter(token => token !== null),
          take(1),
          switchMap(token => {
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token!}`
              }
            });

            return next(retryReq);
          })
        );
      }

      return throwError(() => error);
    })
  );
};