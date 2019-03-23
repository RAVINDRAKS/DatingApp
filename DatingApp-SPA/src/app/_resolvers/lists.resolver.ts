import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_service/user.service';
import { AlertifyjsService } from '../_service/alertifyjs.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class ListsResolver implements Resolve<User[]> {

  pageNumber = 1;
  pageSize = 5;
  likesParam = 'Likers';

  constructor(private userService: UserService,
              private router: Router,
              private alertify: AlertifyjsService) {}


  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParam).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data');
        // tslint:disable-next-line:no-unused-expression
        this.router.navigate['/home'];
        return of (null);

      })
    );
  }

}