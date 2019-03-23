import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUser, IMotionsResult, ICamera, ICamerasResult } from 'src/app/model/_index';
import { MotionService } from 'src/app/service/data/motion.service';
import { ImageViewComponent } from '../../components/common/image-view/image-view.component';
import { LocalDataSource } from 'ng2-smart-table';
import { CloudViewComponent } from '../../components/common/cloud-view/cloud-view.component';
import { FaceButtonComponent } from '../../components/common/face-button/face-button.component';
import { UserService } from 'src/app/service/data/user.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { environment } from 'src/environments/environment';
import { CameraService } from 'src/app/service/data/camera.service';
import { Options } from 'ng5-slider';

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
      Occurred: {
        title: 'Time',
        filter: false,
        sortDirection: 'desc',
        width: '30%'
      },
      Camera: {
        title: 'Camera',
        filter: false,
        width: '30%'
      },
      Frame: {
        title: 'Frame',
        filter: false,
        type: 'custom',
        renderComponent: ImageViewComponent
      },
      Labels: {
        title: '',
        filter: false,
        type: 'custom',
        renderComponent: CloudViewComponent
      },
      Faces: {
        title: '',
        filter: false,
        type: 'custom',
        renderComponent: FaceButtonComponent
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
  fromHour = 0;
  toHour = 12;

  bucketPath = 'https://s3.amazonaws.com/' + environment.rekognitionBucket + '/';

  cameras: [ICamera];

  options: Options = {
    floor: 0,
    ceil: 24,
    step: 1,
    minRange: 1,
    maxRange: 12,
    pushRange: true
  };

  onSliderChange() {
    this.refreshData(this.DateTimeToString(this.fromDate, this.fromHour), this.DateTimeToString(this.toDate, this.toHour));
  }

  constructor(
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private motionService: MotionService,
    private cameraService: CameraService,
    private calendar: NgbCalendar) {
      this.selectToday();
    }

  ngOnInit() {
    console.log('MotionComponent.ngOnInit');
    this.cameraService.Get().subscribe((response: ICamerasResult) => {
      this.cameras = response.Items;
      this.onDateSelection(this.fromDate);
    });
  }

  DateTimeToString(date: NgbDate, hour: number ) {
    return date.year + ('0' + date.month).slice(-2) + ('0' + date.day).slice(-2) + hour.toString().padStart(2, '0') + '0000';
  }

  timeOfTheDay(timestamp: number) {
    const ts = timestamp.toString();
    return ts.slice(8, 10) + ':' + ts.slice(10, 12) + ':' + ts.slice(12, 14);
  }

  cameraName(id) {
    return this.cameras.find((c) => {
      return c.Id === id;
    }).Name;
  }

  refreshData(fromDate: string, toDate: string) {
    console.log('refreshData: ' + fromDate +  '-' + toDate);
    this.spinner.show();

    this.motionService.GetByUser(fromDate, toDate,
      (response: IMotionsResult) => {
        const list = [];
        response.Items.forEach(item => {
          list.push({
            Id: item.Id,
            Camera: this.cameraName(item.CameraId),
            Occurred: this.timeOfTheDay(item.Occurred),
            Frame: JSON.stringify({
              Url: item.Frame,
              Faces: item.Faces
            }),
            Labels: JSON.stringify(item.Labels),
            Faces: JSON.stringify(item.Faces)
          });
          // this.spinner.hide();
        });
        // console.log(list.length);
        this.source = new LocalDataSource(list);
        this.spinner.hide();
    });
  }

  onDateSelection(date: NgbDate) {
    this.fromDate = date;
    this.toDate = date; //this.calendar.getNext(date, 'd', 1);
    this.refreshData(this.DateTimeToString(this.fromDate, this.fromHour), this.DateTimeToString(this.toDate, this.toHour));
  }

  selectToday() {
    this.fromDate = this.calendar.getToday();
    this.fromHour = 0;
    this.toDate = this.fromDate; //this.calendar.getNext(this.calendar.getToday(), 'd', 1);
    this.refreshData(this.DateTimeToString(this.fromDate, this.fromHour), this.DateTimeToString(this.toDate, this.toHour));
  }

  formatConfidence(value: number) {
    return Math.round(value);
  }

  formatHappenedFromDate(date: NgbDate) {
    return date.year + date.month.toString().padStart(2, '0') + date.day.toString().padStart(2, '0') + '000000';
  }

}
