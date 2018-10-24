import { Component, OnInit } from '@angular/core';
import { RestService } from '../../service/common/rest.service';
import { IEvent } from '../../model/event';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { slideToLeft } from '../../router.animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [slideToLeft()],
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
    userId: string;
    fromDate: NgbDate;
    toDate: NgbDate;
    bucketPath = 'https://s3.amazonaws.com/corvid-frames/';

    constructor(
      public rest: RestService,
      private calendar: NgbCalendar) {

        this.selectToday();
      }

    ngOnInit() {
      this.onDateSelection(this.fromDate);
    }

    onDateSelection(date: NgbDate) {
      this.userId = '111111';
      this.fromDate = date;
      this.toDate = this.calendar.getNext(date, 'd', 1);
      this.getEvents(this.userId, this.formatHappenedFromDate(this.fromDate), this.formatHappenedFromDate(this.toDate));
      console.log(this.formatHappenedFromDate(this.fromDate), '-', this.formatHappenedFromDate(this.toDate));
    }

    selectToday() {
      this.fromDate = this.calendar.getToday();
      this.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 1);
    }

    formatConfidence(value: number) {
      return Math.round(value);
    }

    formatHappenedFromDate(date: NgbDate) {
      return date.year + date.month.toString().padStart(2, '0') + date.day.toString().padStart(2, '0') + '000000';
    }

    formatDateFromHappend(value: string) {
      const year = value.substr(0, 4);
      const month = value.substr(4, 2);
      const day = value.substr(6, 2);
      const hour = value.substr(8, 2);
      const min = value.substr(10, 2);
      const sec = value.substr(12, 2);

      return month + '/' + day + '/' + year + ' ' + hour + ':' + min + ':' + sec;
    }

    getEvents(userId, fromDay, toDay) {
        this.events = [];
        this.rest.getEvents(userId, fromDay, toDay).subscribe((data: IEvent[]) => {
            this.events = data;
        });
    }
}
