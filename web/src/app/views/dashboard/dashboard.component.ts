import { Component, OnInit } from '@angular/core';
import { RestService } from '../../service/common/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    events: any = [];

    constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.getEvents();
    }

    getEvents() {
        this.events = [];
        this.rest.getEvents().subscribe((data: {}) => {
          this.events = data;
        });
    }
}
