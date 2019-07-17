import { Component, OnInit } from '@angular/core';
import { FaceService } from 'src/app/service/face.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { IFacesResult, IFace } from 'src/app/model/face';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-face',
  templateUrl: './face.page.html',
  styleUrls: ['./face.page.scss'],
})
export class FacePage implements OnInit {

  faces: Array<IFace> = [];
  isLoading = false;

  facesBucketPath = 'https://s3.amazonaws.com/' + environment.facesBucket + '/';

  constructor(
    private router: Router,
    private userService: UserService,
    private faceService: FaceService
  ) { }

  ngOnInit() {
    console.log('FacesComponent.ngOnInit');
    this.isLoading = true;
    this.userService.Get().subscribe((user) => {
      this.faceService.GetByUser().subscribe(
        (result: IFacesResult) => {
            console.log(result);
            this.faces = result.Items;
            this.isLoading = false;
        });
    });

  }

  getFaceImage(i) {
    return this.facesBucketPath + this.faces[i].UserId + '/' + this.faces[i].Frame;
  }

  onEdit(faceId: string) {
    console.log('FaceComponent.onEdit');
    this.router.navigateByUrl('/settings/face/edit');
    this.router.navigate(['/', 'settings', 'face', 'edit', faceId]);
  }

  onChange(face) {
    console.log('FaceComponent.onChange');
    console.log(face);
    this.faceService.Update(face).subscribe((result) => {
      console.log(result);
    });
  }

}
