import { Component, AfterViewInit, Input } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUserService } from 'src/app/service/common/current-user.service';
import { CurrentUser } from 'src/app/model/_index';
import { MotionService } from 'src/app/service/data/motion.service';
import { ImageViewComponent } from '../../components/common/image-view/image-view.component';
import { LocalDataSource } from 'ng2-smart-table';
import { CloudViewComponent } from '../../components/common/cloud-view/cloud-view.component';
import { FaceViewComponent } from '../../components/common/face-view/face-view.component';
import { UserService } from 'src/app/service/data/user.service';

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
export class MotionComponent implements AfterViewInit {

  settings = {
    columns: {
      occurred: {
        title: 'Time',
        filter: false,
        sortDirection: 'desc',
        width: '30%'
      },
      camera: {
        title: 'Camera',
        filter: false,
        width: '30%'
      },
      frame: {
        title: 'Frame',
        filter: false,
        type: 'custom',
        renderComponent: ImageViewComponent
      },
      labels: {
        title: '',
        filter: false,
        type: 'custom',
        renderComponent: CloudViewComponent
      },
      faces: {
        title: '',
        filter: false,
        type: 'custom',
        renderComponent: FaceViewComponent
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: false,
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
    private userService: UserService,
    private calendar: NgbCalendar) {
      this.selectToday();
    }

  ngAfterViewInit() {
    console.log('MotionComponent.ngOnInit');

    // this.spinner.show();
    this.currentUserService.Initialize(() => {
      this.currentUser = this.currentUserService.User;
      this.onDateSelection(this.fromDate);
    });
  }

  // ngOnInit() {
  //   console.log('MotionComponent.ngOnInit');

  //   this.spinner.show();
  //   this.currentUserService.Initialize(() => {
  //     this.currentUser = this.currentUserService.User;
  //     this.onDateSelection(this.fromDate);
  //   });


  // }

  public NgbDateToString(date: NgbDate) {
    return date.year + ('0' + date.month).slice(-2) + ('0' + date.day).slice(-2) + '000000';
  }

  timeOfTheDay(timestamp: String) {
    return timestamp.slice(8, 10) + ':' + timestamp.slice(10, 12) + ':' + timestamp.slice(12, 14)
  }

  refreshData(userId: String, cameraId: String, fromDate: String, toDate: String) {
    // this.spinner.show();

    // this.userService.Get(userId, cameraId, fromDate, toDate,
    //   (response: ListMotionsQuery) => {
    //     const list = [];
    //     response.listMotions.items.forEach(item => {
    //       list.push({
    //         id: item.id,
    //         camera: item.camera.name,
    //         occurred: this.timeOfTheDay(item.occurred),
    //         frame: JSON.stringify({
    //           url: item.frame,
    //           faces: item.faces
    //         }),
    //         labels: JSON.stringify(item.labels),
    //         faces: JSON.stringify(item.faces)
    //       });
    //     });
    //     // console.log(list.length);
    //     this.source = new LocalDataSource(list);
    //     this.spinner.hide();
    //   // console.log(this.source);
    // });

    // this.motionService.ListMotions(userId, cameraId, fromDate, toDate,
    //   (response: ListMotionsQuery) => {
    //     const list = [];
    //     response.listMotions.items.forEach(item => {
    //       list.push({
    //         id: item.id,
    //         camera: item.camera.name,
    //         occurred: this.timeOfTheDay(item.occurred),
    //         frame: JSON.stringify({
    //           url: item.frame,
    //           faces: item.faces
    //         }),
    //         labels: JSON.stringify(item.labels),
    //         faces: JSON.stringify(item.faces)
    //       });
    //     });
    //     // console.log(list.length);
    //     this.source = new LocalDataSource(list);
    //     this.spinner.hide();
    //   // console.log(this.source);
    // });
  }

  onDateSelection(date: NgbDate) {
    this.fromDate = date;
    this.toDate = this.calendar.getNext(date, 'd', 1);
    console.log('onDateSelection: ' + this.NgbDateToString(this.fromDate), '-', this.NgbDateToString(this.toDate));
    this.refreshData(this.currentUser.id, '', this.NgbDateToString(this.fromDate), this.NgbDateToString(this.toDate));
  }

  selectToday() {
    this.fromDate = this.calendar.getToday();
    this.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 1);
    // console.log('onDateSelection: ' + this.NgbDateToString(this.fromDate), '-', this.NgbDateToString(this.toDate));
    // this.refreshData(this.currentUser.id, '', this.NgbDateToString(this.fromDate), this.NgbDateToString(this.toDate));
  }


  formatConfidence(value: number) {
    return Math.round(value);
  }

//   formatHappenedFromDate(date: NgbDate) {
//     return date.year + date.month.toString().padStart(2, '0') + date.day.toString().padStart(2, '0') + '000000';
//   }

//   formatDateFromHappend(value: string) {
//     const year = value.substr(0, 4);
//     const month = value.substr(4, 2);
//     const day = value.substr(6, 2);
//     const hour = value.substr(8, 2);
//     const min = value.substr(10, 2);
//     const sec = value.substr(12, 2);

//     return month + '/' + day + '/' + year + ' ' + hour + ':' + min + ':' + sec;
//   }


}
