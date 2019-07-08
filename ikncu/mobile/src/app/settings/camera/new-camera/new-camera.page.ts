import { Component, OnInit } from '@angular/core';
import { ICamera } from 'src/app/model/camera';
import { UserService } from 'src/app/service/user.service';
import { CameraService } from 'src/app/service/camera.service';
import * as shortid from '../../../../../node_modules/shortid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-camera',
  templateUrl: './new-camera.page.html',
  styleUrls: ['./new-camera.page.scss'],
})
export class NewCameraPage implements OnInit {

  camera: ICamera = { Name: '', Id: '', Active: 'false', UserId: ''};

  constructor(
    private router: Router,
    public cameraService: CameraService
  ) { }

  ngOnInit() {
  }

  onSave() {
    console.log('NewCameraPage.Change recorded');
    this.camera.Id = shortid.generate();
    this.cameraService.Create(this.camera).subscribe((result) => {
      console.log(result);
      this.router.navigate(['/settings/camera']);
    });
  }

}
