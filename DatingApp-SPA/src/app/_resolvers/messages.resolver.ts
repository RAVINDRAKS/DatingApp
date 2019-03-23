import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_service/user.service';
import { AlertifyjsService } from '../_service/alertifyjs.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/message';
import { AuthService } from '../_service/auth.service';

@Injectable()

export class MessagesResolver implements Resolve<Message[]> {

  pageNumber = 1;
  pageSize = 5;
  messageContainer = 'Unread';

  constructor(private userService: UserService,
              private router: Router,
              private alertify: AlertifyjsService,
              private authService: AuthService) {}


  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving messages');
        // tslint:disable-next-line:no-unused-expression
        this.router.navigate['/home'];
        return of (null);
      })
    );
  }

}