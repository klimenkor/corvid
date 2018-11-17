import { Component, OnInit } from '@angular/core';
import { AwsUtil } from './service/auth/aws.service';
import { UserLoginService } from './service/auth/user-login.service';
import { CognitoUtil, LoggedInCallback } from './service/auth/cognito.service';
import { CurrentUser } from './model/_index';
import { CurrentUserService } from './service/common/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, LoggedInCallback {
    title = 'web';
    currentUser: CurrentUser;

    constructor(
      private currentUserService: CurrentUserService,
      public awsUtil: AwsUtil,
      public userService: UserLoginService,
      public cognito: CognitoUtil) {
        console.log('AppComponent: constructor');
        this.currentUser = new CurrentUser;
    }

    ngOnInit() {
        console.log('AppComponent: Checking if the user is already authenticated');
        this.userService.isAuthenticated(this);

        this.currentUserService.Initialize((value) => {
          this.currentUser = this.currentUserService.User;
          console.log(':::: currentUser.id = ' + this.currentUser.id);
        });
    }

    async isLoggedIn(message: string, isLoggedIn: boolean) {
        console.log('AppComponent: the user is authenticated: ' + isLoggedIn);

        const mythis = this;
        this.cognito.getIdToken({
            callback() { },
            callbackWithParam(token: any) {
                // Include the passed-in callback here as well so that it's executed downstream
                console.log('AppComponent: calling initAwsService in callback');
                mythis.awsUtil.initAwsService(null, isLoggedIn, token);
            }
        });
    }
}
