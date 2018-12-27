import { Component, OnInit } from '@angular/core';
import { CurrentUser } from 'src/app/model/_index';
import { CurrentUserService } from 'src/app/service/common/current-user.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/service/data/user.service';
import { UpdateUserInput } from 'src/graphql/types';


@Component({
  selector: 'app-settings-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  emailChanged = false;
  user = <UpdateUserInput> {
    id: '',
    shortid: '',
    email: '',
    labels: null,
    cameras: null,
    tier: '',
  };
  currentUser: CurrentUser;

  constructor(
    private currentUserService: CurrentUserService,
    private userService: UserService,
    private spinner: NgxSpinnerService) {
      this.currentUser = new CurrentUser;
      console.log('BasicComponent.constructor');
    }

  onSave(event) {
    console.log('saveUser');
    this.spinner.show();
    this.userService.Update(
      this.user,
      (value) => {
        this.spinner.hide();
    });
  }

  async ngOnInit() {
    console.log('BasicComponent.ngOnInit');

    this.currentUserService.Initialize((value) => {
      this.currentUser = this.currentUserService.User;
      this.userService.Initialize(this.currentUser.id, (value1) => {
        this.user = this.userService.User;
        // console.log(':::: user.email = ' + this.user.email);
      });
    });
  }

  onEmailChange(event) {
    this.emailChanged = true;
  }

}
