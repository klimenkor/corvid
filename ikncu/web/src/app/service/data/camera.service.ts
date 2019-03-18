import { Injectable } from '@angular/core';
import { ICamera } from 'src/app/model/_index';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cacheable, CacheBuster } from 'ngx-cacheable';
import { Subject } from 'rxjs';

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

    @Cacheable({
        cacheBusterObserver: cacheBuster$
    })
    public Get() {
        console.log('CameraService.GetByUser');
        return this.http.get(environment.apiHost + '/camera/byuser?hkey=' + this.authService.CognitoUser.id + '&rkey=1', this.httpOptions);
    }

    // @CacheBuster({
    //     cacheBusterNotifier: cacheBuster$
    // })
    public Create(data: ICamera) {
        console.log('CameraService.Create');
        data.UserId = this.authService.CognitoUser.id;
        console.log(data);
        return this.http.post(environment.apiHost + '/camera', data, this.httpOptions);
    }

    @CacheBuster({
        cacheBusterNotifier: cacheBuster$
    })
    public Update(data: ICamera) {
        console.log('CameraService.Update');
        data.UserId = this.authService.CognitoUser.id;
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
