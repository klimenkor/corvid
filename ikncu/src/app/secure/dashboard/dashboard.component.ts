import { Component, OnInit } from '@angular/core';
import { IEvent } from '../../model/event';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { slideToLeft } from '../../router.animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor() {  }

    ngOnInit() {  }

}
