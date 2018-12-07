// tslint:disable:component-selector
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRegistrationService} from '../../../service/auth/user-registration.service';
import {UserLoginService} from '../../../service/auth/user-login.service';
import {LoggedInCallback} from '../../../service/auth/cognito.service';
import { UserService } from 'src/app/service/data/user.service';
import { CreateUserInput } from 'src/graphql/types';
import { CurrentUserService } from 'src/app/service/common/current-user.service';
import { CurrentUser } from 'src/app/model/_index';

@Component({
    selector: 'awscognito-angular2-app',
    template: ''
})
export class LogoutComponent implements LoggedInCallback {

    constructor(public router: Router,
                public userLoginService: UserLoginService) {
        this.userLoginService.isAuthenticated(this);
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (isLoggedIn) {
            this.userLoginService.logout();
            this.router.navigate(['/']);
        }

        this.router.navigate(['/']);
    }
}

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './confirmRegistration.html'
})
export class RegistrationConfirmationComponent implements OnInit, OnDestroy {
    confirmationCode: string;
    email: string;
    errorMessage: string;
    private sub: any;
    currentUser: CurrentUser;

    constructor(
      public regService: UserRegistrationService,
      public router: Router,
      public route: ActivatedRoute,
      private userService: UserService,
      private currentUserService: CurrentUserService ) {
    }

    ngOnInit() {
      this.currentUserService.Initialize(() => {
        this.currentUser = this.currentUserService.User;
      });

      this.sub = this.route.params.subscribe(params => {
            this.email = params['username'];

      });

      this.errorMessage = null;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onConfirmRegistration() {
        this.errorMessage = null;
        this.regService.confirmRegistration(this.email, this.confirmationCode, this);
    }

    cognitoCallback(message: string, result: any) {
        console.log(result);
        if (message != null) { // error
            this.errorMessage = message;
            console.log('message: ' + this.errorMessage);
        } else { // success
          this.userService.Create(
            <CreateUserInput>{
              id: this.currentUser.id,
              email: this.currentUser.email,
              labels: null,
              tierId: null
            },
            (value) => {
               console.log('::::user created for cognitoUser');
            });

            // move to the next step
            console.log('Moving to securehome');
            // this.configs.curUser = result.user;
            this.router.navigate(['/securehome']);
        }
    }
}





