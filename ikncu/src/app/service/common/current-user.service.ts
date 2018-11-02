import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { CurrentUser, IToken } from '../../model/_index';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  public user: CurrentUser;

  constructor(
    private logger: LoggerService,
    private localStorage: LocalStorageService
    ) {
      logger.info('CurrentUserService...');
      this.user = new CurrentUser();
      const data: JSON = this.localStorage.get();
      if (!!data) {
         this.user.username = data['username'];
         this.user.refreshToken = data['refreshToken'];
         this.user.token = data['token'];
      }
  }
  public get(): CurrentUser {
      return this.user;
  }

  public save(username: string, token: IToken): void {
      this.user.username = username;
      this.user.token = token.access_token;
      this.user.refreshToken = token.refresh_token;
      this.localStorage.add(JSON.stringify(this.user));
  }

  public remove(): void {
      this.user.username = '';
      this.user.token = '';
      this.user.refreshToken = '';
      this.localStorage.remove();
  }
}
