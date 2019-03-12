import { Injectable } from '@angular/core';
import { CurrentUser } from '../../model/_index';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private _initialized = false;

  constructor(
      private authService: AuthService,
      private _cognitoUser: CurrentUser
  ) {}

  public Initialize(callback) {
    if (!this._initialized) {
      this._cognitoUser = new CurrentUser();

      // const u = this._amplifyService.auth().currentUserInfo();
      // u.then((v) => {
      //   if (v != null) {
      //     this._cognitoUser.id = v.attributes.sub;
      //     this._cognitoUser.email = v.attributes.email;
      //     this._cognitoUser.name = v.username;
      //     this._initialized = true;
      //   }
      //   callback(this._initialized);
      // });
    } else {
      callback(this._initialized);
    }
  }

  public get User(): CurrentUser {
    return this._initialized ? this._cognitoUser : null;
  }
}
