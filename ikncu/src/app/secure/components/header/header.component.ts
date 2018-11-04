import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserLoginService } from 'src/app/service/auth/user-login.service';
import { CognitoUtil } from 'src/app/service/auth/cognito.service';
import { CurrentUserService } from 'src/app/service/common/current-user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass = 'push-right';
    public email: string;

    constructor(
        private currentUser: CurrentUserService,
        public userService: UserLoginService,
        public cognitoUtil: CognitoUtil,
        public router: Router) {

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

    }

    async ngOnInit() {
      const user = await this.currentUser.get();
      this.email = user.email;
      // this.userParams.getParameters(new GetParametersCallback(this, this.cognitoUtil));
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

}

