import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUser, IMotionsResult, ICamera, ICamerasResult, ILabelCloud, IMotionView, IDetectedFace } from 'src/app/model/_index';
import { MotionService } from 'src/app/service/data/motion.service';
import { LocalDataSource } from 'ng2-smart-table';
import { environment } from 'src/environments/environment';
import { CameraService } from 'src/app/service/data/camera.service';
import { Options } from 'ng5-slider';
import { CloudData } from 'angular-tag-cloud-module';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
  `],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.3s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class MotionComponent implements OnInit {


  source: LocalDataSource;
  motions: Array<IMotionView> = new Array<IMotionView>();
  currentFrame: string;
  currentFaces: IDetectedFace[];
  showFrame = false;

  showCloud = true;
  showCloudtext = 'Show images';
  currentUser: CurrentUser;
  fromDate: NgbDate;
  toDate: NgbDate;
  fromHour = 0;
  toHour = 12;

  bucketPath = 'https://s3.amazonaws.com/' + environment.framesBucket + '/';

  cameras: [ICamera];

  options: Options = {
    floor: 0,
    ceil: 24,
    step: 1,
    minRange: 1,
    maxRange: 12,
    pushRange: true
  };

  constructor(
    private spinner: NgxSpinnerService,
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

  onSliderChange() {
    this.refreshData(this.DateTimeToString(this.fromDate, this.fromHour), this.DateTimeToString(this.toDate, this.toHour));
  }

  onClick(motion: IMotionView){
    this.showFrame = true;
    this.currentFrame = motion.Frame;
    this.currentFaces = motion.Faces;

    console.log(motion);
  }

  onClose(event){
    this.showFrame = false;
    console.log(event);
  }

  onSwitchTagCloud(index){
    this.motions[index].ShowTagCloud = !this.motions[index].ShowTagCloud;
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
        this.motions = [];
        response.Items.sort((a, b) => b.Occurred - a.Occurred).forEach(item => {

          const labels = new Array<CloudData>();
          let tagsNumber = 0;
          item.Labels.forEach(element => {
            if (element.Confidence > 50 && tagsNumber <5 ) {
              labels.push({text: element.Name, weight: Math.round(element.Confidence / 10), link: '/home/settings/labels', color: 'red'});
              tagsNumber++;
            }
          });

          this.motions.push({
            Id: item.Id,
            Camera: this.cameraName(item.CameraId),
            Occurred: this.timeOfTheDay(item.Occurred),
            Frame: item.Frame,
            Labels: labels,
            Faces: item.Faces,
            ShowTagCloud: true
          });
          // this.spinner.hide();
        });
        // console.log(this.motions);
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

  selectYesterday() {
    this.fromDate = this.calendar.getNext(this.calendar.getToday(), 'd', -1);
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
