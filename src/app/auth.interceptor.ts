import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { API_URL } from './app.config';
import { inject } from '@angular/core';
import { AuthUsersService } from './user-domain/service/auth-users.service';
import { catchError, throwError } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authUserService = inject(AuthUsersService);
  const hotToastService = inject(HotToastService)
  
  let reqClone = req.clone({
    
  });
  const reqCloneUrl = reqClone.url;
  const reqCloneUrlSplit = reqCloneUrl.split(API_URL);

  if(!reqCloneUrlSplit[1].indexOf('auth')) return next(req);

  let token = authUserService.getUserToken("accessToken");

  reqClone = reqClone.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
      },
    });

  return next(reqClone).pipe(
      catchError((error: HttpErrorResponse) => {
        // Token invalid / expired → logout immediately
        if (error.status === 401) {
          hotToastService.error('Token Expired. Please login again')
          authUserService.logout();
        }
        return throwError(() => error);
      })
  )
};
