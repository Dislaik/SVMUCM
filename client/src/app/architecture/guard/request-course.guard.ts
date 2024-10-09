import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Utils } from '../../utils';

export const requestCourseGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  const isAuthenticated = !!Utils.getStorage('keyToken'); // Ejemplo: verificar si hay un token

  if (isAuthenticated) {
    
    return true;
  }

  router.navigate(['/'])
  return false;
};
