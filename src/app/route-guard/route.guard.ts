import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const routeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const token = localStorage.getItem('access_token');
  if (token) {
    return true;
  }
  else {
    toastr.error('Unauthorised access')
    localStorage.clear();
    router.navigateByUrl('/login');
    return false;
  }
};