import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

import { AuthService } from '../service/auth.service';
import { CognitoCallback, LoggedInCallback, ChallengeParameters } from '../service/cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements CognitoCallback, LoggedInCallback, OnInit {
  isLoading = false;
  isLogin = true;
  email: string;
  password: string;
  errorMessage: string;
  mfaStep = false;
  mfaData = {
      destination: '',
      callback: null
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  onLogin() {
    this.isLoading = true;

    this.authService.authenticate(this.email, this.password, this);

    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        // setTimeout(() => {
        //   this.isLoading = false;
        //   loadingEl.dismiss();
        // }, 1500);
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);

    if (this.isLogin) {
      // Send a request to login servers
    } else {
      // Send a request to signup servers
    }
  }

  cognitoCallback(message: string, result: any) {
    console.log('loginComponent.cognitoCallback');
    if (message != null && message !== 'Unknown error, the response body from fetch is: undefined') { // error
          this.errorMessage = message;
          console.log('result: ' + this.errorMessage);
          if (this.errorMessage === 'User is not confirmed.') {
              console.log('redirecting');
              this.router.navigate(['/confirmRegistration', this.email]);
          } else if (this.errorMessage === 'User needs to set password.') {
              console.log('redirecting to set new password');
              this.router.navigate(['/newPassword']);
          }
      } else { // success
        console.log('result: ' + this.errorMessage);
        this.router.navigate(['/home']);
        this.loadingCtrl.dismiss();
        this.isLoading = false;

      }
  }

  handleMFAStep(challengeName: string, challengeParameters: ChallengeParameters, callback: (confirmationCode: string) => any): void {
      this.mfaStep = true;
      this.mfaData.destination = challengeParameters.CODE_DELIVERY_DESTINATION;
      this.mfaData.callback = (code: string) => {
          if (code == null || code.length === 0) {
              this.errorMessage = 'Code is required';
              return;
          }
          this.errorMessage = null;
          console.log('loginComponent.handleMFAStep');
          callback(code);
      };
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    console.log('loginComponent.isLoggedIn');
    if (isLoggedIn) {
        this.router.navigate(['/home']);
    }
  }

  cancelMFA(): boolean {
    console.log('loginComponent.cancelMFA');
    this.mfaStep = false;
    return false;   // necessary to prevent href navigation
  }


}
