// tslint:disable:component-selector

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../../../service/auth/user-registration.service';
import { CognitoCallback } from '../../../service/auth/cognito.service';
import { UserRegistration } from 'src/app/model/_index';

/**
 * This component is responsible for displaying and controlling
 * the registration of the user.
 */
@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './registration.html'
})
export class RegisterComponent implements CognitoCallback {
    registrationUser: UserRegistration;
    router: Router;
    errorMessage: string;

    constructor(public userRegistrationService: UserRegistrationService, router: Router) {
        this.router = router;
        this.onInit();
    }

    onInit() {
        this.registrationUser = new UserRegistration();
        this.errorMessage = null;
    }

    onRegister() {
        this.errorMessage = null;
        this.userRegistrationService.register(this.registrationUser, this);
    }

    cognitoCallback(message: string, result: any) {
        if (message != null) {
            this.errorMessage = message;
            console.log('result: ' + this.errorMessage);
        } else {
            console.log('redirecting');
            this.router.navigate(['/confirmRegistration', result.user.username]);
        }
    }
}
