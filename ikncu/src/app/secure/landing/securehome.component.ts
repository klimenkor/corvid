import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserLoginService} from '../../service/auth/user-login.service';
import {LoggedInCallback} from '../../service/auth/cognito.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'awscognito-angular2-app',
    templateUrl: './secureHome.html',
    styleUrls: ['./secureHome.scss']
})
export class SecureHomeComponent implements OnInit, LoggedInCallback {

    collapedSideBar: boolean;

    constructor(public router: Router, public userService: UserLoginService) {
        this.userService.isAuthenticated(this);
        console.log('SecureHomeComponent: constructor');
    }

    ngOnInit() {

    }

    receiveCollapsed($event) {
      this.collapedSideBar = $event;
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        }
    }
}

