import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader-service';
import { ToastrService } from 'ngx-toastr';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const loaderService = inject(LoaderService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  const skipUrls = ['/login', '/refresh', '/signup', '/forgotPassword'];
  const skipLoadingUrls = ['/usernameCheck', '/generate'];

  const isSkippedRequest = skipUrls.some((url) => req.url.includes(url));
  const isLoadingSkippedRequest = skipLoadingUrls.some((url) => req.url.includes(url));

  if (!isLoadingSkippedRequest) {
    loaderService.show();
  }

  const addAuthHeader = (token: string | null) => {
    if (!token) {
      return req;
    }

    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const handleSessionFailure = (message: string) => {
    authService.clearTokens();
    authService.isLoggedIn.set(false);
    router.navigate(['/login']);
    toastr.error(message);
    return throwError(() => new Error(message));
  };

  const sendRequest = (token: string | null) => next(addAuthHeader(token));

  if (isSkippedRequest) {
    return next(req).pipe(finalize(() => loaderService.hide()));
  }

  const accessToken = authService.getAccessToken();
  const refreshToken = authService.getRefreshToken();

  if (!accessToken && refreshToken) {
    return authService.initializeAuthSession().pipe(
      switchMap((isAuthenticated) => {
        if (!isAuthenticated) {
          return handleSessionFailure('Session TimeOut !! Login Again');
        }

        return sendRequest(authService.getAccessToken());
      }),
      catchError(() => handleSessionFailure('Session TimeOut !! Login Again')),
      finalize(() => loaderService.hide()),
    );
  }

  return sendRequest(accessToken).pipe(
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
              return next(addAuthHeader(newAccessToken));
            }),
            catchError((refreshError) => {
              isRefreshing = false;
              return handleSessionFailure(
                error.status === 401 ? 'Session TimeOut !! Login Again' : 'Permission Denied!!',
              );
            }),
          );
        }

        return refreshTokenSubject.pipe(
          filter((token) => token !== null),
          take(1),
          switchMap((token) => next(addAuthHeader(token))),
        );
      }

      if (error.status === 500) {
        toastr.error('Internal Server Error!!!');
      }
      if (error.status === 404) {
        toastr.info('No data found!!!');
      }

      return throwError(() => error);
    }),
  );
};
