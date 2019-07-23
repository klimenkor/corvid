import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MotionService } from 'src/app/service/motion.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { IMotionsResult, IMotionResult, IMotion } from 'src/app/model/motion';

@Component({
  selector: 'app-motion',
  templateUrl: './motion.page.html',
  styleUrls: ['./motion.page.scss'],
})
export class MotionPage implements OnInit {

  motionId: string;
  isLoading = false;
  motion: IMotion; // = { Id: null, CameraId: null, Occurred: null, Frame: null, Labels: null, Faces: null, People: null };

  constructor(
    private route: ActivatedRoute,
    private motionService: MotionService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
    console.log('MotionPage.ngOnInit');

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('motionId')) {
        this.navCtrl.navigateBack('/dashboard');
        return;
      }
      this.motionId = paramMap.get('motionId');
      this.isLoading = true;

      this.motionService.Get(this.motionId,
        (response: IMotionResult) => {
          if (response.Item === null) {
            return;
          }
          console.log('...motion loaded');
          this.motion = response.Item;
          this.loadingCtrl.dismiss();
          this.isLoading = false;
      });
    });
  }

  onClose(event) {

  }

}
