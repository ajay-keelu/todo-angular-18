import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, switchMap, throwError, of } from 'rxjs';
import { UtilityService } from '../services/utility/utility.service';
import { AuthenticationService } from '../services/authentication/authentication.service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token') as string;
  const refresh = localStorage.getItem('refresh_token') as string;
  const route = inject(Router);
  const toaster = inject(ToastrService);
  const utility = inject(UtilityService);
  const auth = inject(AuthenticationService);

  const clonereq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
  utility.displayLoader();

  return next(clonereq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status == 401) {
        if (refresh) {
          return auth.refreshLogin(refresh).pipe(
            switchMap((data: any) => {
              localStorage.clear();
              localStorage.setItem('access_token', data['access_token']);
              localStorage.setItem('refresh_token', data['refresh_token']);
              const newCloneReq = req.clone({
                setHeaders: { Authorization: `Bearer ${data['access_token']}` },
              });
              return next(newCloneReq);
            }),
            catchError((err) => {
              toaster.error('Unauthorized error');
              route.navigateByUrl('/login');
              localStorage.clear();
              return throwError(() => err)
            })
          );
        } else {
          toaster.error('Unauthorized error');
          route.navigateByUrl('/login');
          localStorage.clear();
        }
      }
      return throwError(() => err);
    }),
    finalize(() => utility.hideLoader())
  );
};
