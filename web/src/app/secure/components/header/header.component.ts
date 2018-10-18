import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserParametersService } from '../../../service/auth/user-parameters.service';
import { UserLoginService } from 'src/app/service/auth/user-login.service';
import { CognitoUtil, Callback } from 'src/app/service/auth/cognito.service';
// import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass = 'push-right';
    public email: string;

    constructor(
        public userParams: UserParametersService,
        public userService: UserLoginService,
        public cognitoUtil: CognitoUtil,
        public router: Router) {

        // this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        // this.translate.setDefaultLang('en');
        // const browserLang = this.translate.getBrowserLang();
        // this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

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

    ngOnInit() {
      this.userParams.getParameters(new GetParametersCallback(this, this.cognitoUtil));
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

    // changeLang(language: string) {
    //     this.translate.use(language);
    // }

}

export class Parameters {
  name: string;
  value: string;
}

export class GetParametersCallback implements Callback {

  constructor(public me: HeaderComponent, public cognitoUtil: CognitoUtil) {

  }

  callback() {

  }

  callbackWithParam(result: any) {

      for (let i = 0; i < result.length; i++) {
          if (result[i].getName() === 'email') {
            this.me.email = result[i].getValue();
            break;
          }
      }
  }
}
