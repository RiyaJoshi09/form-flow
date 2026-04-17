import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth-service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.initializeAuthSession().pipe(
        map((isAuthenticated) => {
            if (isAuthenticated) {
                return true;
            }
            return router.createUrlTree(['/login']);
        }),
        catchError(() => {
            authService.clearTokens();
            authService.isLoggedIn.set(false);
            return of(router.createUrlTree(['/login']));
        }),
    );
};