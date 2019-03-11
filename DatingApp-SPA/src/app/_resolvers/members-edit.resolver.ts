import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_service/user.service';
import { AlertifyjsService } from '../_service/alertifyjs.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_service/auth.service';

@Injectable()

export class MembersEditResolver implements Resolve<User> {

  constructor(private userService: UserService,
              private router: Router,
              private alertify: AlertifyjsService,
              private authService: AuthService) {}


  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    // tslint:disable-next-line:no-string-literal
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving your data');
        // tslint:disable-next-line:no-unused-expression
        this.router.navigate['/members'];
        return of (null);

      })
    );
  }

}
