import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ICamera, ICamerasResult, ICameraResult } from 'src/app/model/camera';
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
    private cameraService: CameraService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    console.log('EditCamera.ngOnInit');

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('cameraId')) {
        this.navCtrl.navigateBack('/settings/cameras');
        return;
      }
      this.cameraId = paramMap.get('cameraId');
      this.isLoading = true;

      this.cameraService.Get(this.cameraId)
        .subscribe(
          (result: ICameraResult) => {
            this.camera = result.Item;
            this.form = new FormGroup({
              name: new FormControl(this.camera.Name, {
                updateOn: 'blur',
                validators: [Validators.required]
              })
            });
            this.isLoading = false;
          },
          error => {
            this.alertCtrl
              .create({
                header: 'An error occurred!',
                message: 'Camera could not be fetched. Please try again later.',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigate(['/settings/camera']);
                    }
                  }
                ]
              })
              .then(alertEl => {
                alertEl.present();
              });
          }
        );
    });
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
