// tslint:disable:component-selector
import {Component} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {Callback, CognitoUtil, LoggedInCallback} from '../../service/auth/cognito.service';
import {UserParametersService} from '../../service/auth/user-parameters.service';
import {Router} from '@angular/router';


@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './myprofile.html'
})
export class MyProfileComponent implements LoggedInCallback {

    public parameters: Array<Parameters> = [];
    public cognitoId: String;

    constructor(
        public router: Router,
        public authService: AuthService,
        public userParams: UserParametersService,
        public cognitoUtil: CognitoUtil) {
        this.authService.isAuthenticated(this);
        console.log('In MyProfileComponent');
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        } else {
            this.userParams.getParameters(new GetParametersCallback(this, this.cognitoUtil));
        }
    }
}

export class Parameters {
    name: string;
    value: string;
}

export class GetParametersCallback implements Callback {

    constructor(public me: MyProfileComponent, public cognitoUtil: CognitoUtil) {

    }

    callback() {

    }

    callbackWithParam(result: any) {

        for (let i = 0; i < result.length; i++) {
            const parameter = new Parameters();
            parameter.name = result[i].getName();
            parameter.value = result[i].getValue();
            this.me.parameters.push(parameter);
        }
        const param = new Parameters();
        param.name = 'cognito ID';
        param.value = this.cognitoUtil.getCognitoIdentity();
        this.me.parameters.push(param);
    }
}
