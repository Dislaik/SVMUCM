import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authResolver: ResolveFn<boolean> = (route, state) => {
  return inject(AuthService).verify();
};
