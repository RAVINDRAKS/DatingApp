import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { AlertifyjsService } from '../_service/alertifyjs.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private alertify: AlertifyjsService,
              private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    const roles = next.firstChild.data.roles as Array<string>;
    if (roles) {
      const match = this.authService.roleMatch(roles);
      if (match) {
        return true ;
      } else {
        this.router.navigate(['members']);
        this.alertify.error('You are not authorised to access this area');
      }
    }
    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('You shall not pass!!!');
    this.router.navigate(['/home']);
    return false;
  }
}
