import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Utils } from '../../app.utils';
import { AuthService } from '../service/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ProjectService } from '../service/project.service';

export const ownProjectGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const projectService = inject(ProjectService);
  const projectId = route.params['id'];
  const response = await authService.verify();

  if (response.ok) {
    const verified = response.message;
    
    if (verified) {
      const token = Utils.getStorage('keyToken');
      const decoded = jwtDecode(token);

      const response = await projectService.getById(projectId);

      if (response.ok) {
        const project = response.message;

        if (project && project.id_user.username === decoded['username']) {
          return true;
        }
      }
    }
  }
  
  router.navigate(['/'])

  return false;
};
