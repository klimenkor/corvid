import { Component, OnInit } from '@angular/core';
import { ISetting, CurrentUser } from 'src/app/model/_index';
import { AmplifyService } from 'aws-amplify-angular';
import { CognitoUtil } from 'src/app/service/auth/cognito.service';
import { CurrentUserService } from 'src/app/service/common/current-user.service';

@Component({
  selector: 'app-settings-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  emailChanged = false;

  setting: ISetting = null;
  userId = '111111';
  user: CurrentUser;

  constructor(
    private currentUser: CurrentUserService,
    public amplifyService: AmplifyService,
    private cognitoUtil: CognitoUtil ) {
      this.amplifyService = amplifyService;
      this.user = new CurrentUser;
    }

  saveEmail(event) {

  }

  async ngOnInit() {
    this.setting = null;
    this.user = await this.currentUser.get();
  }

  onEmailChange(event) {
    this.emailChanged = true;
  }

}
