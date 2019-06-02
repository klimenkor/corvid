import { Component, OnInit } from '@angular/core';

import { IMotionsResult, IMotionView, IDetectedFace } from '../../model/motion';
import { MotionService } from '../../service/motion.service';
import { environment } from 'src/environments/environment';
import { CloudData } from 'angular-tag-cloud-module';
import { CameraService } from 'src/app/service/camera.service';
import { FaceService } from 'src/app/service/face.service';
import { ICamera, ICamerasResult } from 'src/app/model/camera';
import { IFace, IFacesResult } from 'src/app/model/face';
import { LoadingController } from '@ionic/angular';
import { integer } from 'aws-sdk/clients/storagegateway';

@Component({
  selector: 'app-dashboard-motion',
  templateUrl: './motion.component.html',
  styleUrls: ['./motion.component.scss'],
})
export class MotionComponent implements OnInit {


  motions: Array<IMotionView> = new Array<IMotionView>();
  currentMotion: string;
  currentFrame: string;
  currentFaces: IDetectedFace[];
  showFrame = false;

  showCloud = true;
  showCloudtext = 'Show images';
  // currentUser: CurrentUser;
  fromDate: integer;
  toDate: integer;
  fromHour = 0;
  toHour = 12;

  bucketPath = 'https://s3.amazonaws.com/' + environment.framesBucket + '/';

  cameras: [ICamera];
  faces: [IFace];

  isLoading: boolean;

  constructor(
    private motionService: MotionService,
    private cameraService: CameraService,
    private faceService: FaceService,
    private loadingCtrl: LoadingController) {
      this.selectToday();
    }

  ngOnInit() {
    console.log('MotionComponent.ngOnInit');
    this.cameraService.Get().subscribe((cameras: ICamerasResult) => {
      this.cameras = cameras.Items;
      this.faceService.Get().subscribe((faces: IFacesResult) => {
        this.faces = faces.Items;
        console.log(faces)
        // this.onDateSelection(this.fromDate);
      });
    });
  }

  onClick(motion: IMotionView){
    this.showFrame = true;
    this.currentMotion = motion.Id;
    this.currentFrame = motion.Frame;
    this.currentFaces = motion.Faces;

    console.log(motion);
  }

  onClose(event) {
    this.showFrame = false;
    console.log(event);
  }

  onSwitchTagCloud(index){
    this.motions[index].ShowTagCloud = !this.motions[index].ShowTagCloud;
  }

  // DateTimeToString(date: NgbDate, hour: number ) {
  //   return date.year + ('0' + date.month).slice(-2) + ('0' + date.day).slice(-2) + hour.toString().padStart(2, '0') + '0000';
  // }

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

    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
      });


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

          if (item.People != null) {
            item.People.forEach(person => {
              const face = this.faces.find(x => x.Id === person.FaceId);
              if (face != null) {
                labels.push({text: face.Name, weight: 10, link: '/home/settings/faces', color: 'red'});
              }
            });
          }

          this.motions.push({
            Id: item.Id,
            Camera: this.cameraName(item.CameraId),
            Occurred: this.timeOfTheDay(item.Occurred),
            Frame: item.Frame,
            Labels: labels,
            Faces: item.Faces,
            ShowTagCloud: true
          });
        });

        this.loadingCtrl.dismiss();
        this.isLoading = false;
    });
  }

  DateTimeToString(fromDate, fromHour) {
    return fromDate + fromHour.toString().padStart(2, '0') + '0000';
  }

  onRefresh() {
    this.refreshData(this.DateTimeToString(this.fromDate, this.fromHour), this.DateTimeToString(this.toDate, this.toHour));
  }

  selectToday() {
    this.fromDate = 20190531;
    this.fromHour = 2;
    this.toDate = this.fromDate; //this.calendar.getNext(this.calendar.getToday(), 'd', 1);
    this.refreshData(this.DateTimeToString(this.fromDate, this.fromHour), this.DateTimeToString(this.toDate, this.toHour));
  }

  selectYesterday() {
    this.fromDate = 20190531;
    this.fromHour = 0;
    this.toDate = this.fromDate; //this.calendar.getNext(this.calendar.getToday(), 'd', 1);
    this.refreshData(this.DateTimeToString(this.fromDate, this.fromHour), this.DateTimeToString(this.toDate, this.toHour));
  }

  formatConfidence(value: number) {
    return Math.round(value);
  }

  // formatHappenedFromDate(date: NgbDate) {
  //   return date.year + date.month.toString().padStart(2, '0') + date.day.toString().padStart(2, '0') + '000000';
  // }

}
