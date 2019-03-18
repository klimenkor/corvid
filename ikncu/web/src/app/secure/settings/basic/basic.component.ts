import { Component, OnInit } from '@angular/core';
import { CurrentUser, IUser, IUserResult } from 'src/app/model/_index';
import { CurrentUserService } from 'src/app/service/common/current-user.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/service/data/user.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-settings-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  emailChanged = false;
  currentUser = {
    Id: '',
    Name: '',
    Email: ''
  } as IUser;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private spinner: NgxSpinnerService) {
      // this.currentUser = new CurrentUser();
      console.log('BasicComponent.constructor');
    }

  onSave(event) {
    console.log('saveUser');
    this.spinner.show();
    this.userService.Update(this.currentUser).subscribe(
      (value) => {
        this.spinner.hide();
    });
  }

  async ngOnInit() {
    console.log('BasicComponent.ngOnInit');

    this.userService.Get().subscribe((result: IUserResult) => {
      this.currentUser = result.Item;
      console.log(this.currentUser);
    });
  }

  onEmailChange(event) {
    this.emailChanged = true;
  }

}
