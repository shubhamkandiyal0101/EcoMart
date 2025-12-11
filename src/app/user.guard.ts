import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthUsersService } from './user-domain/service/auth-users.service';

export const userGuard: CanActivateFn = (route, state) => {

  const authUserService = inject(AuthUsersService);
  const router = inject(Router);

  if(authUserService.isLoggedIn()) {
    return true;
  } else {
    return router.navigate(['/login'])
  }

  return true;
};
