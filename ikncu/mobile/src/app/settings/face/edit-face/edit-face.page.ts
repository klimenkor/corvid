import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IFace, IFaceResult } from 'src/app/model/face';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FaceService } from 'src/app/service/face.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-face',
  templateUrl: './edit-face.page.html',
  styleUrls: ['./edit-face.page.scss'],
})
export class EditFacePage implements OnInit {

  face: IFace = {Name:'', Id: '', CategoryId: '', Frame: '', UserId: ''};
  faceId: string;
  form: FormGroup;
  isLoading = false;

  facesBucketPath = 'https://s3.amazonaws.com/' + environment.facesBucket + '/';

  constructor(
    private route: ActivatedRoute,
    private faceService: FaceService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    console.log('EditFace.ngOnInit');

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('faceId')) {
        this.navCtrl.navigateBack('/settings/face');
        return;
      }
      this.faceId = paramMap.get('faceId');
      this.isLoading = true;
      console.log('Fetching ' + this.faceId);
      this.faceService.Get(this.faceId)
        .subscribe(
          (result: IFaceResult) => {
            this.face = result.Item;
            this.form = new FormGroup({
              name: new FormControl(this.face.Name, {
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
                message: 'Face could not be fetched. Please try again later.',
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

  getFaceImage() {
    return this.facesBucketPath + this.face.UserId + '/' + this.face.Frame;
  }

  onUpdateface() {

  }
}
