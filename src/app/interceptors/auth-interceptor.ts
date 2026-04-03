import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader-service';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const loaderService = inject(LoaderService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  const skipUrls = ['/login', '/refresh', '/signup'];

  if (skipUrls.some((url) => req.url.includes(url))) {
    return next(req);
  }

  if (!skipUrls.some((url) => req.url.includes(url))) {
    loaderService.show();
  }

  const accessToken = authService.getAccessToken();
  let authReq = req;

  if (accessToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return next(authReq).pipe(
    finalize(() => loaderService.hide()),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
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
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });

              return next(retryReq);
            }),

            catchError((err) => {
              isRefreshing = false;
              if (error.status === 401) {
                authService.clearTokens();
                authService.isLoggedIn.set(false);
                router.navigate(['/login']);
                toastr.error('Session TimeOut !! Login Again');
              } else {
                toastr.error('Permission Denied!!');
              }
              return throwError(() => err);
            }),
          );
        }

        return refreshTokenSubject.pipe(
          filter((token) => token !== null),
          take(1),
          switchMap((token) => {
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token!}`,
              },
            });

            return next(retryReq);
          }),
        );
      }
      if (error.status === 500) toastr.error('Internal Server Error!!!');
      if (error.status === 404) toastr.info('No data found!!!');
      return throwError(() => error);
    }),
  );
};
