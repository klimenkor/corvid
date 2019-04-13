import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import {LoggedInCallback} from '../../service/auth/cognito.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'awscognito-angular2-app',
    templateUrl: './home.html',
    styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit, LoggedInCallback {

    collapedSideBar: boolean;

    constructor(
      public router: Router,
      public authService: AuthService ) {
      console.log('HomeComponent.constructor');
      this.authService.isAuthenticated(this);
    }

    ngOnInit() {

    }

    receiveCollapsed($event) {
      console.log('HomeComponent.receiveCollapsed');
      this.collapedSideBar = $event;
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
      console.log('HomeComponent.isLoggedIn');
      if (!isLoggedIn) {
          this.router.navigate(['/home/login']);
      }
    }
}

