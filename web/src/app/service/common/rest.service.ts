import { Injectable } from '@angular/core';
import { Injector } from '@angular/core';
import { Http } from '@angular/http';
import { Resource } from 'angular-resource';
import { CurrentUserService } from './current-user.service';
import { environment } from '../../../environments/environment';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class RestService extends Resource {

  private currentUser: CurrentUserService;

  constructor(
    private logger: LoggerService,
    http: Http,
    injector: Injector,
    currentUser: CurrentUserService
  ) {
    super(http);
    this.currentUser = currentUser;
  }

  // apply HTTP(S) and HOSTNAME from Config service
  $getUrl(methodOptions?: any): string | Promise<string> {
    const path = 'http' + (environment.ssl ? 's://' : '://') + environment.apiHost + super.$getUrl();
      this.logger.info('restService:path=' + path);
      return path;
  }

  // inject authentication Token into request Header before sending HTTP request
  $getHeaders(methodOptions?: any): any {

      const headers: any = {
          'Authorization': 'Bearer ' + this.currentUser.get().token,
          'Content-Type': 'application/json'
      };
      return headers;
  }
}
