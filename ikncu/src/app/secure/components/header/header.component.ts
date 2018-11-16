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

    toggleClass = 'ft-maximize';
    placement = 'bottom-right';
    public isCollapsed = true;


    constructor(
        private currentUser: CurrentUserService,
        public userService: UserLoginService,
        public cognitoUtil: CognitoUtil,
        public router: Router) {

        // this.router.events.subscribe(val => {
        //     if (
        //         val instanceof NavigationEnd &&
        //         window.innerWidth <= 992 &&
        //         this.isToggled()
        //     ) {
        //         this.toggleSidebar();
        //     }
        // });

    }

    async ngOnInit() {
      const user = this.currentUser.get();
      user.then((value) => {
        this.email = this.currentUser.cognitoUser.email;
      });

      // this.userParams.getParameters(new GetParametersCallback(this, this.cognitoUtil));
    }

    ToggleClass() {
        if (this.toggleClass === 'ft-maximize') {
            this.toggleClass = 'ft-minimize';
        } else {
            this.toggleClass = 'ft-maximize';
        }
    }

    // isToggled(): boolean {
    //     const dom: Element = document.querySelector('body');
    //     return dom.classList.contains(this.pushRightClass);
    // }

    // toggleSidebar() {
    //     const dom: any = document.querySelector('body');
    //     dom.classList.toggle(this.pushRightClass);
    // }

    // rltAndLtr() {
    //     const dom: any = document.querySelector('body');
    //     dom.classList.toggle('rtl');
    // }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

}

