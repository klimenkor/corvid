import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { CameraService } from 'src/app/service/camera.service';
import { ICamerasResult } from 'src/app/model/camera';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  cameras = [];
  isLoading = false;

  constructor(
    private userService: UserService,
    public cameraService: CameraService
  ) { }

  async ngOnInit() {
    console.log('CamerasComponent.ngOnInit');
    this.isLoading = true;
    this.userService.Get().subscribe((user) => {
      this.cameraService.Get().subscribe(
        (result: ICamerasResult) => {
            console.log(result);
            this.cameras = result.Items.map(x => {
              return {
                Id: x.Id,
                Name: x.Name,
                Active: x.Active === '1' ? 'true' : 'false'
              };
            });
            this.isLoading = false;
        });
    });
  }

  onEdit() {
    console.log('CamerasComponent.onEdit');

  }

  onChange(camera) {
    console.log('CamerasComponent.onChange');
    console.log(camera);
    this.cameraService.Update(camera).subscribe((result) => {
      console.log(result);
    });
  }
}
