import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICamera } from 'src/app/model/camera';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { CameraService } from 'src/app/service/camera.service';

@Component({
  selector: 'app-edit-camera',
  templateUrl: './edit-camera.page.html',
  styleUrls: ['./edit-camera.page.scss'],
})
export class EditCameraPage implements OnInit {
  
  camera: ICamera;
  cameraId: string;
  form: FormGroup;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private placesService: CameraService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  onUpdateCamera() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Updating camera...'
      })
      .then(loadingEl => {
        loadingEl.present();
        // this.placesService
        //   .updatePlace(
        //     this.place.id,
        //     this.form.value.title,
        //     this.form.value.description
        //   )
        //   .subscribe(() => {
        //     loadingEl.dismiss();
        //     this.form.reset();
        //     this.router.navigate(['/places/tabs/offers']);
        //   });
      });
  }

}
