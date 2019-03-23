import { Component, OnInit } from '@angular/core';
import { AwsUtil } from './service/auth/aws.service';
import { AuthService } from './service/auth/auth.service';
import { CognitoUtil, LoggedInCallback } from './service/auth/cognito.service';
import { CurrentUser } from './model/_index';
import { CurrentUserService } from './service/common/current-user.service';
import { CameraService } from './service/data/camera.service';
import { UserService } from './service/data/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, LoggedInCallback {
    title = 'web';
    currentUser: CurrentUser;

    constructor(
      public awsUtil: AwsUtil,
      public authService: AuthService,
      public userService: UserService,
      public cameraService: CameraService,

      public cognito: CognitoUtil) {
        console.log('AppComponent: constructor');
        this.currentUser = new CurrentUser();
    }

    ngOnInit() {
        console.log('AppComponent: Checking if the user is already authenticated');
        this.authService.isAuthenticated(this);
    }

    async isLoggedIn(message: string, isLoggedIn: boolean) {
        console.log('AppComponent: the user is authenticated: ' + isLoggedIn);

        const mythis = this;
        this.cognito.getIdToken({
            callback() { },
            callbackWithParam(token: any) {
                // Include the passed-in callback here as well so that it's executed downstream
                mythis.userService.Init(
                  () => {
                    console.log('AppComponent: user loaded');
                    mythis.cameraService.Init(
                      () => {
                         console.log('AppComponent: cameras loaded');
                    });
                });

                console.log('AppComponent: calling initAwsService in callback');
                mythis.awsUtil.initAwsService(null, isLoggedIn, token);
            }
        });
    }
}
