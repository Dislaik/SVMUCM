import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Utils } from '../../app.utils';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);

  const isAuthenticated = !!Utils.getStorage('keyToken');

  if (isAuthenticated) {
    
    return true;
  }

  router.navigate(['/'])

  return false;
};
