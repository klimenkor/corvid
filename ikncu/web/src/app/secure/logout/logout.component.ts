// tslint:disable:component-selector
import { Component} from '@angular/core';
import { Router} from '@angular/router';
import { LoggedInCallback } from 'src/app/service/auth/cognito.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
    selector: 'awscognito-angular2-app',
    template: ''
})
export class LogoutComponent implements LoggedInCallback {

    constructor(public router: Router,
                public authService: AuthService) {
        this.authService.isAuthenticated(this);
        console.log('LogoutComponent.constructor')  ;
      }

    isLoggedIn(message: string, isLoggedIn: boolean) {
      console.log('LogoutComponent.isLoggedIn')  ;
      if (isLoggedIn) {
        console.log('LogoutComponent.isLoggedIn: logged in')  ;
        this.authService.logout();
        this.router.navigate(['/']);
      }

      this.router.navigate(['/']);
    }
}

