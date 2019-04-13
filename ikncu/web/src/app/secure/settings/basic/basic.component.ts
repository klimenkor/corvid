import { Component, OnInit } from '@angular/core';
import { IUser, IUserResult } from 'src/app/model/_index';

import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/service/data/user.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ITimeZone, TimeZoneList } from 'src/app/model/timezone';

@Component({
  selector: 'app-settings-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  timeZones: ITimeZone[];
  emailChanged = false;
  user = {
    Id: '',
    Name: '',
    Email: '',
    UtcOffset: '',
    TierId: '',
    Created: null
  } as IUser;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private spinner: NgxSpinnerService) {
      console.log('BasicComponent.constructor');
      this.timeZones = TimeZoneList;
    }

  onSave(event) {
    console.log('saveUser');
    console.log(this.user);
    this.spinner.show();
    this.userService.Update(this.user).subscribe(
      (value) => {
        this.spinner.hide();
    });
  }

  async ngOnInit() {
    console.log('BasicComponent.ngOnInit');

    this.userService.Get().subscribe((result: IUserResult) => {
        // console.log(result);
        this.user.Id = result.Item.Id;
        this.user.Name = result.Item.Name;
        this.user.Email = result.Item.Email;
        this.user.UtcOffset = result.Item.UtcOffset;
        this.user.TierId = result.Item.TierId;
        this.user.Created = result.Item.Created;
        console.log(this.user);
      });

  }

  onEmailChange(event) {
    this.emailChanged = true;
  }

}
