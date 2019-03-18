import { Component, OnInit } from '@angular/core';
import { IUser, IUserResult } from 'src/app/model/_index';

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
        console.log(result);
        this.currentUser = result.Item;

    });
  }

  onEmailChange(event) {
    this.emailChanged = true;
  }

}
