import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import {LoggedInCallback} from '../../service/auth/cognito.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'awscognito-angular2-app',
    templateUrl: './secureHome.html',
    styleUrls: ['./secureHome.scss']
})
export class SecureHomeComponent implements OnInit, LoggedInCallback {

    collapedSideBar: boolean;

    constructor(
      public router: Router,
      public authService: AuthService ) {
      console.log('SecureHomeComponent.constructor');
      this.authService.isAuthenticated(this);
    }

    ngOnInit() {

    }

    receiveCollapsed($event) {
      console.log('SecureHomeComponent.receiveCollapsed');
      this.collapedSideBar = $event;
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
      console.log('SecureHomeComponent.isLoggedIn');
      if (!isLoggedIn) {
          this.router.navigate(['/home/login']);
      }
    }
}

