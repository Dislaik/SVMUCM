import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Utils } from '../../utils';
import { AuthService } from '../service/auth.service';

export const AuthGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  const isAuthenticated = !!Utils.getStorage('keyToken'); // Ejemplo: verificar si hay un token

  if (isAuthenticated) {
    router.navigate(['/'])
    return false;
  }

  return true;
};
