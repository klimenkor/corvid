import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/model/_index';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../../graphql/queries';
import * as mutations from '../../../../graphql/mutations';
import * as shortid from 'node_modules/shortid';
import { ListCamerasQuery, CreateCameraMutation, CreateCameraInput,
          UpdateCameraMutation, DeleteCameraMutation } from '../../../../graphql/types';
import { GraphQLResult } from '@aws-amplify/api/lib/types';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUserService } from 'src/app/service/common/current-user.service';
import { CurrentUser } from 'src/app/model/_index';
import { CameraService } from 'src/app/service/data/camera.service';
import { MotionService } from 'src/app/service/data/motion.service';

@Component({
  selector: 'app-dashboard-motion',
  templateUrl: './motion.component.html',
  styleUrls: ['./motion.component.css'],
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
export class MotionComponent implements OnInit {

  events: IEvent[] = [];
  userId: string;
  fromDate: NgbDate;
  toDate: NgbDate;
  bucketPath = 'https://s3.amazonaws.com/corvid-frames/';

  settings = {
    columns: {
      name: {
        title: 'Name',
        filter: false,
      },
      shortid: {
        title: 'ShortId',
        filter: false,
        editable: false
      },
      active: {
        title: 'Active',
        filter: false
      }
    },
    attr: {
      class: 'table table-responsive'
    },
    edit: {
      editButtonContent: '<i class="ft-edit-2 info font-medium-1 mr-2"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-2"></i>',
      confirmDelete: true
    },
    add: {
      confirmCreate: true
    }
  };

  source = [];
  currentUser: CurrentUser;

  constructor(
    private spinner: NgxSpinnerService,
    private currentUserService: CurrentUserService,
    private motionService: MotionService,

    private calendar: NgbCalendar) {

      this.selectToday();
    }

  ngOnInit() {
    console.log('MotionComponent.ngOnInit');
    this.onDateSelection(this.fromDate);

    this.spinner.show();

    this.currentUserService.Initialize(() => {
      this.currentUser = this.currentUserService.User;
    });

    const result = API.graphql(graphqlOperation(queries.listCameras)) as Promise<GraphQLResult>;
    result.then((value) => {
      const v = value.data as ListCamerasQuery;
      this.source = v.listCameras.items;
      this.spinner.hide();
    });
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
      // this.rest.getEvents(userId, fromDay, toDay).subscribe((data: IEvent[]) => {
      //     this.events = data;
      // });
  }

}
