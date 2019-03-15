import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_service/auth.service';
import { UserService } from 'src/app/_service/user.service';
import { AlertifyjsService } from 'src/app/_service/alertifyjs.service';

@Component({
  selector: 'app-members-card',
  templateUrl: './members-card.component.html',
  styleUrls: ['./members-card.component.scss']
})
export class MembersCardComponent implements OnInit {
  @Input() user: User;

  constructor(private authService: AuthService,
              private userService: UserService,
              private alterify: AlertifyjsService) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alterify.success('You have liked: ' + this.user.knownAs);
    }, err => {
      this.alterify.error(err);
    });
  }

}
