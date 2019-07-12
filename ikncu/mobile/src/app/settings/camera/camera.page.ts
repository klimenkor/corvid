import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { CameraService } from 'src/app/service/camera.service';
import { ICamerasResult } from 'src/app/model/camera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  cameras = [];
  isLoading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    public cameraService: CameraService
  ) { }

  async ngOnInit() {
    console.log('CamerasComponent.ngOnInit');
    this.isLoading = true;
    this.userService.Get().subscribe((user) => {
      this.cameraService.GetByUser().subscribe(
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

  onEdit(cameraId: string) {
    console.log('CamerasComponent.onEdit');
    this.router.navigateByUrl('/settings/camera/edit');
    this.router.navigate(['/', 'settings', 'camera', 'edit', cameraId]);
  }

  onCheck() {
    console.log('CamerasComponent.onCheck');
    
  }

  onChange(camera) {
    console.log('CamerasComponent.onChange');
    console.log(camera);
    this.cameraService.Update(camera).subscribe((result) => {
      console.log(result);
    });
  }
}
