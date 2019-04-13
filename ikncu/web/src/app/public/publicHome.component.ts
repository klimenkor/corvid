// tslint:disable:component-selector
import {Component, OnInit} from '@angular/core';

declare let AWS: any;
declare let AWSCognito: any;

@Component({
    selector: 'awscognito-angular2-app',
    template: '<p>Hello and welcome!"</p>'
})
export class AboutComponent {

}

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './landinghome.html'
})
export class PublicHomeLandingComponent {
    constructor() {
        console.log('PublicHomeLandingComponent constructor');
    }
}

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './publicHome.html'
})
export class PublicHomeComponent implements OnInit {

    constructor() {
        console.log('PublicHomeComponent constructor');
    }

    ngOnInit() {

    }
}


