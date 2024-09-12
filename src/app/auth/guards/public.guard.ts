import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';

import { inject } from '@angular/core';
import { Observable,tap,map} from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkLoginStatus = (): Observable<boolean> => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  // localStorage.removeItem('token')
  return authService.checkAuth().pipe(
    tap((isAuthenticated) => console.log('Authenticated:',isAuthenticated)),
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigate(['./heroes/list']);
      }
    }),
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        return true;
      }
      return isAuthenticated;
    })
  );

};

//No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
export const canLoginGuard: CanActivateFn = ( //Hay que tener en cuenta el tipado CanActiveFn
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // console.log('CanActivate');
  // console.log({ route, state });

  return checkLoginStatus();
};

export const canMatchLoginGuard: CanMatchFn = ( //Tipado CanMatchFN
  route: Route,
  segments: UrlSegment[]
) => {
  // console.log('CanMatch');
  // console.log({ route, segments });

  return !checkLoginStatus();
};
