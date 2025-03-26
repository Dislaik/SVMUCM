import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Utils } from '../../app.utils';

export const noAuthGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  
  const isAuthenticated = !!Utils.getStorage('keyToken');

  console.log(isAuthenticated)

  if (!isAuthenticated) {
    
    return true;
  }

  router.navigate(['/'])

  return false;
};
