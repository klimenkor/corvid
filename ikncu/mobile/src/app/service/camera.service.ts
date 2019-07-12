import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cacheable, CacheBuster } from 'ngx-cacheable';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { ICamera } from '../model/camera';

// import { Timestamp } from 'aws-sdk/clients/kinesisvideoarchivedmedia';

const cacheBuster$ = new Subject<void>();

@Injectable({
  providedIn: 'root'
})
export class CameraService {

    private httpOptions = {
        headers: new HttpHeaders({
        Authorization: this.authService.CognitoUser.jwtToken
    })};

    constructor(
        private authService: AuthService,
        private http: HttpClient ) {
    }

    public Init(callback) {
      this.GetByUser().subscribe(
        (response) => {
          callback(response);
      });
    }

    @Cacheable({
        cacheBusterObserver: cacheBuster$
    })
    public GetByUser() {
        console.log('CameraService.GetByUser');
        return this.http.get(environment.apiHost + '/camera/byuser?hkey=' + this.authService.CognitoUser.id, this.httpOptions);
    }

    @Cacheable({
      cacheBusterObserver: cacheBuster$
    })
    public Get(id: string) {
        console.log('CameraService.GetByUser');
        return this.http.get(environment.apiHost + '/camera?id=' + id, this.httpOptions);
    }

    @CacheBuster({
        cacheBusterNotifier: cacheBuster$
    })
    public Create(data: ICamera) {
        console.log('CameraService.Create');
        data.UserId = this.authService.CognitoUser.id;
        return this.http.post(environment.apiHost + '/camera', data, this.httpOptions);
    }

    @CacheBuster({
        cacheBusterNotifier: cacheBuster$
    })
    public Update(data: ICamera) {
        console.log('CameraService.Update');
        data.UserId = this.authService.CognitoUser.id;
        data.Active = data.Active.toString();
        console.log(data)
        return this.http.put(environment.apiHost + '/camera', data, this.httpOptions);
    }

    @CacheBuster({
        cacheBusterNotifier: cacheBuster$
    })
    public Delete(data: ICamera) {
        console.log('CameraService.delete');
        return this.http.delete(environment.apiHost + '/camera?id=' + data.Id, this.httpOptions);
    }
}
