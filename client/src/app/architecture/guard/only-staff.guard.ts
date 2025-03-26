import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Utils } from '../../app.utils';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../service/auth.service';

export const onlyStaffGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const response = await authService.verify();


  if (response.ok) {
    const verified = response.message;
    
    if (verified) {
      const token = Utils.getStorage('keyToken');
      const decoded = jwtDecode(token);
      console.log(decoded)

      if ((decoded['role'].name) !== 'community') {
        return true
      }
    }
  }
  
  router.navigate(['/'])

  return false;
};
