import { Component, OnInit } from '@angular/core';
import { RestService } from '../../service/common/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent } from '../../model/event';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    events: IEvent[] = [];

    constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        const today = new Date();
        const dd = today.getDate();
        const ddTomorrow = today.getDate() + 1;
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        // const fromDay = yyyy + '' + mm + '' + dd + '000000';
        // const toDay = yyyy + '' + mm + '' + ddTomorrow + '000000';
        const fromDay = '20181010000000';
        const toDay = '20181011000000';


        this.getEvents(fromDay, toDay);
    }

    getEvents(fromDay, toDay) {
        this.events = [];
        this.rest.getEvents(fromDay, toDay).subscribe((data: IEvent[]) => {
            this.events = data;
        });
    }
}
