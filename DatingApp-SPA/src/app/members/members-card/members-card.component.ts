import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-members-card',
  templateUrl: './members-card.component.html',
  styleUrls: ['./members-card.component.scss']
})
export class MembersCardComponent implements OnInit {
  @Input() user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
