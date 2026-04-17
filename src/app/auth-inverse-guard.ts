import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth-service';
import { map } from 'rxjs';

export const authInverseGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.initializeAuthSession().pipe(
    map((isAuthenticated) => (isAuthenticated ? router.createUrlTree(['/home']) : true)),
  );
};
