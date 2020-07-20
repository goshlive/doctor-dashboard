import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from './services/api.service';
import { User } from './model/user.model';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  user: User;

  constructor(
        private router: Router,
        private apiService: ApiService
  ) {
    this.apiService.authUserObservable.subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.user) {
        // authorised so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
