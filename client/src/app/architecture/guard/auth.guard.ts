import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Utils } from '../../utils';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  const isAuthenticated = !!Utils.getStorage('token'); // Ejemplo: verificar si hay un token
  console.log(isAuthenticated);

  if (isAuthenticated) {
    router.navigate(['/'])
    return false;
  }

  return true;
};
