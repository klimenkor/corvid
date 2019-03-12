import {Component} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {Callback, CognitoUtil, LoggedInCallback} from '../../service/auth/cognito.service';
import {Router} from '@angular/router';


export class Stuff {
    public accessToken: string;
    public idToken: string;
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'awscognito-angular2-app',
    templateUrl: './jwt.html'
})
export class JwtComponent implements LoggedInCallback {

    public stuff: Stuff = new Stuff();

    constructor(public router: Router, public authService: AuthService, public cognitoUtil: CognitoUtil) {
        this.authService.isAuthenticated(this);
        console.log('in JwtComponent');

    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        } else {
            this.cognitoUtil.getAccessToken(new AccessTokenCallback(this));
            this.cognitoUtil.getIdToken(new IdTokenCallback(this));
        }
    }
}

export class AccessTokenCallback implements Callback {
    constructor(public jwt: JwtComponent) {

    }

    callback() {

    }

    callbackWithParam(result) {
        this.jwt.stuff.accessToken = result;
    }
}

export class IdTokenCallback implements Callback {
    constructor(public jwt: JwtComponent) {

    }

    callback() {

    }

    callbackWithParam(result) {
        this.jwt.stuff.idToken = result;
    }
}
