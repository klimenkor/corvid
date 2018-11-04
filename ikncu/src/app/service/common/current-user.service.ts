import { Injectable } from '@angular/core';
import { CurrentUser } from '../../model/_index';
import { AmplifyService } from 'aws-amplify-angular';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private user: CurrentUser;

  constructor(
    public amplifyService: AmplifyService
    ) { }

  public async get(): Promise<CurrentUser> {
    if (this.user === undefined) {
      this.user = new CurrentUser;
      const currentUser = await this.amplifyService.auth().currentUserInfo();
      this.user.id = currentUser.attributes.sub;
      this.user.email = currentUser.attributes.email;
      this.user.name = currentUser.username;
    }
    return this.user;
  }
}
