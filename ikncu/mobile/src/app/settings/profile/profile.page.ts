import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { LoadingController } from '@ionic/angular';
import { IUser, IUserResult } from 'src/app/model/user';
import { isBuffer } from 'util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: IUser = { Id: '', Name: '', Email: '', TierId: '', UtcOffset: '', Created: null};
  isLoading = false;

  constructor(
    private userService: UserService,
    private loadingCtrl: LoadingController
) { }

  async ngOnInit() {
    this.isLoading = true;
    this.userService.Get().subscribe((result: IUserResult) => {
      this.user = result.Item;
      this.isLoading = false;
      console.log(this.user);
    });
  }

}
