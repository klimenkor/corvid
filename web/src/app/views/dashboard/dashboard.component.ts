import { Component, OnInit } from '@angular/core';
import { RestService } from '../../service/common/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent } from '../../model/event';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `]
})
export class DashboardComponent implements OnInit {

    events: IEvent[] = [];

    hoveredDate: NgbDate;
    fromDate: NgbDate;
    toDate: NgbDate;

    constructor(
      public rest: RestService,
      private route: ActivatedRoute,
      private router: Router,
      private calendar: NgbCalendar) {

        this.fromDate = calendar.getToday();
        this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
      }

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

    onDateSelection(date: NgbDate) {
      if (!this.fromDate && !this.toDate) {
        this.fromDate = date;
      } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
        this.toDate = date;
      } else {
        this.toDate = null;
        this.fromDate = date;
      }
    }

    isHovered(date: NgbDate) {
      return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }

    isInside(date: NgbDate) {
      return date.after(this.fromDate) && date.before(this.toDate);
    }

    isRange(date: NgbDate) {
      return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
    }

    getEvents(fromDay, toDay) {
        this.events = [];
        this.rest.getEvents(fromDay, toDay).subscribe((data: IEvent[]) => {
            this.events = data;
        });
    }
}
