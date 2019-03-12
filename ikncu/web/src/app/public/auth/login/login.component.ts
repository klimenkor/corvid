// tslint:disable:component-selector

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChallengeParameters, CognitoCallback, LoggedInCallback, CognitoUtil } from '../../../service/auth/cognito.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/data/user.service';

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './login.html',
    styleUrls: ['./login.scss']
})
export class LoginComponent implements CognitoCallback, LoggedInCallback, OnInit {
    email: string;
    password: string;
    errorMessage: string;
    mfaStep = false;
    mfaData = {
        destination: '',
        callback: null
    };

    constructor(public router: Router,
                public userService: UserService,
                public authService: AuthService,
                private cognitoUtil: CognitoUtil
                ) {
        console.log('LoginComponent constructor');
    }

    ngOnInit() {
      console.log('loginComponent.ngOnInit');
      this.errorMessage = null;
      console.log('Checking if the user is already authenticated. If so, then redirect to the secure site');
      this.authService.isAuthenticated(this);
    }

    onLogin() {
        console.log('loginComponent.onLogin');
        if (this.email == null || this.password == null) {
            this.errorMessage = 'All fields are required';
            return;
        }
        this.errorMessage = null;
        // this.authService.signIn(this.email, this.password);
        this.authService.authenticate(this.email, this.password, this);
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
          // this.ddb.writeLogEntry('login');
          this.router.navigate(['/securehome/dashboard']);
          this.userService.Initialize({});

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
          this.router.navigate(['/securehome']);
      }
    }

    cancelMFA(): boolean {
      console.log('loginComponent.cancelMFA');
      this.mfaStep = false;
      return false;   // necessary to prevent href navigation
    }
}
