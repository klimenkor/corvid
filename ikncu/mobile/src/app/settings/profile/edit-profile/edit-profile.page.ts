import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, IUserResult } from 'src/app/model/user';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  user: IUser = { Id: '', Name: '', Email: '', TierId: '', UtcOffset: '', Created: null};
  userId: string;
  form: FormGroup;
  isLoading = false;

  constructor(
    private userService: UserService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  async ngOnInit() {

    console.log('EditProfilePage.ngOnInit');

    this.userService.Get().subscribe((result: IUserResult) => {
      this.user = result.Item;
      console.log(this.user);
    });
  }

  onUpdateProfile() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Updating place...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.userService.Update(this.user).subscribe(
          (value) => {
            loadingEl.dismiss();
        });
      });
  }

}
