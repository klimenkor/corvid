import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AwsUtil } from './auth/service/aws.service';
import { AuthService } from './auth/service/auth.service';
import { CognitoUtil } from './auth/service/cognito.service';
import { UserService } from './service/user.service';
import { CameraService } from './service/camera.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public userService: UserService,
    public cameraService: CameraService,
    public awsUtil: AwsUtil,
    public authService: AuthService,
    public cognito: CognitoUtil ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
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
