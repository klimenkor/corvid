import { Injectable } from '@angular/core';
import * as shortid from 'node_modules/shortid';
import { ICamera, ICameraResult } from 'src/app/model/_index';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

    public GetAll(callback) {
        console.log('CameraService.List');

        const userId = this.authService.CognitoUser.id;

        this.http.get(environment.apiHost + '/camera/byuser?hkey=' + userId + '&rkey=1', this.httpOptions)
        .subscribe(
            (result: ICameraResult) => {
                console.log(result);
                if (callback !== undefined) { callback(result); }
            },
            (error) => {
                console.log('Failed to retrieve user');
                console.log(error);
            }
        );
    }

    public Create(data: ICamera, callback) {
        console.log('CameraService.Create');

        data.Id = shortid();
        this.http.post(environment.apiHost + '/camera', data, this.httpOptions)
        .subscribe(
            (result: ICameraResult) => {
                console.log(result);
                if (callback !== undefined) { callback(result); }
            },
            (error) => {
                console.log('Failed to retrieve user');
                console.log(error);
            }
        );
    }

    public Update(data: ICamera, callback) {
        console.log('CameraService.Update');
        this.http.put(environment.apiHost + '/camera', data, this.httpOptions)
        .subscribe(
            (result: ICameraResult) => {
                console.log(result);
                if (callback !== undefined) { callback(result); }
            },
            (error) => {
                console.log('Failed to retrieve user');
                console.log(error);
            }
        );
    }

    public Delete(data: ICamera, callback) {
        console.log('CameraService.delete');

        this.http.delete(environment.apiHost + '/camera?id=' + data.Id, this.httpOptions)
        .subscribe(
            (result: ICameraResult) => {
                console.log(result);
                if (callback !== undefined) { callback(result); }
            },
            (error) => {
                console.log('Failed to retrieve user');
                console.log(error);
            }
        );
    }
}
