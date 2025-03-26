import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { Utils } from '../../app.utils';

export const roleGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const expectedRoles: string[] = route.data?.['roles'] || [];
  const username = Utils.getUsernameByBrowser();

  if (username) {
    const response = await userService.getByUsername(username);

    if (response.ok) {
      const user = response.message
      const role = user.id_role.name

      if (expectedRoles.includes(role)) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    }
  }

  router.navigate(['/']);
  return false;
};
