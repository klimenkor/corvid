import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../../graphql/queries';
import { ListMotionsQuery } from '../../../../graphql/types';
import { GraphQLResult } from '@aws-amplify/api/lib/types';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUserService } from 'src/app/service/common/current-user.service';
import { CurrentUser } from 'src/app/model/_index';
import { MotionService } from 'src/app/service/data/motion.service';
import { ImageViewComponent } from '../../components/common/image-view/image-view.component';
import { Motion } from 'src/app/model/motion';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

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

  settings = {
    columns: {
      id: {
        title: 'Id',
        filter: false
      },
      camera: {
        title: 'Camera',
        filter: false
      },
      occured: {
        title: 'Occured',
        filter: false
      },
      frame: {
        title: 'Frame',
        filter: false,
        type: 'custom',
        renderComponent: ImageViewComponent
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: false,
      // custom: [{ name: 'edit', title: '<i class="nb-edit"></i>' }],
      position:  'left',
    },
    attr: {
      class: 'table table-responsive'
    }
  };

  source: LocalDataSource;

  currentUser: CurrentUser;
  fromDate: NgbDate;
  toDate: NgbDate;
  bucketPath = 'https://s3.amazonaws.com/corvid-frames/';

  constructor(
    private spinner: NgxSpinnerService,
    private currentUserService: CurrentUserService,
    private motionService: MotionService,
    private calendar: NgbCalendar) {
      this.selectToday();
    }

  ngOnInit() {
    console.log('MotionComponent.ngOnInit');

    this.spinner.show();
    this.currentUserService.Initialize(() => {
      this.currentUser = this.currentUserService.User;
      this.onDateSelection(this.fromDate);
      this.spinner.hide();
    });
  }

  public NgbDateToString(date: NgbDate) {
    return date.year + '-' + date.month + '-' + date.day;
  }

  onDateSelection(date: NgbDate) {
    this.spinner.show();
    this.fromDate = date;
    this.toDate = this.calendar.getNext(date, 'd', 1);
    this.motionService.ListMotions(this.NgbDateToString(this.fromDate), this.NgbDateToString(this.toDate), (response: ListMotionsQuery) => {
      const list = [];
      response.listMotions.items.forEach(item => {
        list.push({
          id: item.id,
          camera: item.camera.name,
          occured: item.occured,
          frame: item.frame,
          labels: item.labels
        });
        this.source = new LocalDataSource(list);
      });
      this.spinner.hide();
      console.log(this.source);
    });

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

  // getMotions(userId, fromDate, toDate) {
  //   const result = API.graphql(graphqlOperation(queries.listMotions, {'motionUserId': userId})) as Promise<GraphQLResult>;
  //   result.then((value) => {
  //     const v = value.data as ListMotionsQuery;
  //     this.source = v.listMotions.items;
  //     this.spinner.hide();
  //   });
  // }

}
