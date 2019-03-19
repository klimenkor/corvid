import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IFace } from 'src/app/model/_index';
import { Cacheable, CacheBuster } from 'ngx-cacheable';
import { Subject } from 'rxjs';

const cacheBuster$ = new Subject<void>();

@Injectable({
  providedIn: 'root'
})
export class FaceService {

  private httpOptions = {
    headers: new HttpHeaders({
    Authorization: this.authService.CognitoUser.jwtToken
  })};

  constructor(
      private authService: AuthService,
      private http: HttpClient ) {
  }

  @Cacheable({
      cacheBusterObserver: cacheBuster$
  })
  public Get() {
      console.log('FaceService.GetByUser');
      return this.http.get(environment.apiHost + '/face/byuser?hkey=' + this.authService.CognitoUser.id + '&rkey=1', this.httpOptions);
  }

  @CacheBuster({
      cacheBusterNotifier: cacheBuster$
  })
  public Create(data: IFace) {
      console.log('FaceService.Create');
      data.UserId = this.authService.CognitoUser.id;
      console.log(data);
      return this.http.post(environment.apiHost + '/face', data, this.httpOptions);
  }

  @CacheBuster({
      cacheBusterNotifier: cacheBuster$
  })
  public Update(data: IFace) {
      console.log('FaceService.Update');
      data.UserId = this.authService.CognitoUser.id;
      return this.http.put(environment.apiHost + '/face', data, this.httpOptions);
  }

  @CacheBuster({
      cacheBusterNotifier: cacheBuster$
  })
  public Delete(data: IFace) {
      console.log('FaceService.delete');
      return this.http.delete(environment.apiHost + '/face?id=' + data.Id, this.httpOptions);
  }

}
