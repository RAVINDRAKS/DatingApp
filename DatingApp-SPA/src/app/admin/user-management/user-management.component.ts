import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_service/admin.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[];
  bsModalRef: BsModalRef | null;

  constructor(private adminService: AdminService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe((users: User[]) => {
      this.users = users;
    }, err => {
      console.log(err);
    });
  }

  editRolesModal(user: User) {
    const initialState = {
      user,
      roles: this.getRolesArray(user)
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, {initialState});
    this.bsModalRef.content.updateSelectedRoles.subscribe((values: any) => {
      const rolesToUpdate = {
        roleNames: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      if (rolesToUpdate) {
        this.adminService.updateUserRoles(user, rolesToUpdate).subscribe(() => {
          user.roles = [...rolesToUpdate.roleNames];
        }, err => {
          console.log(err);
        });
      }
    });
  }

  private getRolesArray(user: User) {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'Moderator', value: 'Moderator'},
      {name: 'Member', value: 'Member'},
      {name: 'VIP', value: 'VIP'},
    ];

    // for (let i=0; i < availableRoles.length; i++) {
    //   let isMatch = false;
    //   for (let j=0; j < userRoles.length; j++) {
    //     if (availableRoles[i].name === userRoles[j]) {
    //       isMatch = true;
    //       availableRoles[i].checked = true;
    //       roles.push(availableRoles[i]);
    //       break;
    //       }
    //   }
    //   if (!isMatch) {
    //     availableRoles[i].checked = false;
    //     roles.push(availableRoles[i]);
    //   }
    // }

    for (const each of availableRoles) {
      let isMatch = false;
      for (const role of userRoles) {
        if (each.name === role) {
          isMatch = true;
          each.checked = true;
          roles.push(each);
          break;
        }
      }
      if (!isMatch) {
        each.checked = false;
        roles.push(each);
      }
    }
    return roles;
  }
}
