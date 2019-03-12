import {Component} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {LoggedInCallback} from '../../service/auth/cognito.service';
import {Router} from '@angular/router';
import {DynamoDBService} from '../../service/auth/ddb.service';


export class Stuff {
    public type: string;
    public date: string;
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'awscognito-angular2-app',
    templateUrl: './useractivity.html'
})
export class UseractivityComponent implements LoggedInCallback {

    public logdata: Array<Stuff> = [];

    constructor(public router: Router, public ddb: DynamoDBService, public authService: AuthService) {
        this.authService.isAuthenticated(this);
        console.log('in UseractivityComponent');
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        } else {
            console.log('scanning DDB');
            this.ddb.getLogEntries(this.logdata);
        }
    }

}
