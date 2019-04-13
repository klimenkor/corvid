// tslint:disable:component-selector
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRegistrationService } from '../../../service/auth/user-registration.service';
import { UserService } from 'src/app/service/data/user.service';
import { CurrentUserService } from 'src/app/service/common/current-user.service';
import { CurrentUser, IUser } from 'src/app/model/_index';

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
        console.log('result=' + result);
        console.log('message=' + message);
        if (result !== 'SUCCESS') { // error
            this.errorMessage = message;
            console.log('message: ' + this.errorMessage);
        } else { // success
          this.userService.Create(
            {
              Id: this.currentUser.id,
              Email: this.currentUser.email,
              Name: '',
              Labels: null,
              TierId: null
            } as IUser, {});

            // move to the next step
            console.log('Moving to home');
            // this.configs.curUser = result.user;
            this.router.navigate(['/home']);
        }
    }
}





