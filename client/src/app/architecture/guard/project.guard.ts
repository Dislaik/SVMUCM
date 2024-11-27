import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProjectService } from '../service/project.service';
import { Utils } from '../../utils';

export const projectGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const projectService = inject(ProjectService);
  const projectId = route.params['id'];
  const response = await projectService.getById(projectId);

  if (response.ok) {
    const project = response.message
    const username = Utils.getUsernameByBrowser();
    
    if (project && project.id_user.username === username) {
      return true
    }

    router.navigate(['/']);
    return false
  }

  router.navigate(['/']);
  return false
};
