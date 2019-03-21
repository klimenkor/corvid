import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IMotionResult, IMotion, IMotionsResult } from 'src/app/model/_index';

@Injectable({
    providedIn: 'root'
  })
export class MotionService {

    private httpOptions = {
        headers: new HttpHeaders({
        Authorization: this.authService.CognitoUser.jwtToken
    })};

    constructor(
        private authService: AuthService,
        private http: HttpClient ) {
    }

    public GetByUser(fromDate, toDate, callback) {
        console.log('MotionService.GetByUser');

        const userId = this.authService.CognitoUser.id;
        let rkey = '';
        if (fromDate !== null) {
            rkey = '&rkey1=' + fromDate + '&rkey2=' + toDate;
        }
        this.http.get(environment.apiHost + '/motion/byuser?hkey=' + userId + rkey, this.httpOptions)
            .subscribe(
                (result: IMotionsResult) => {
                    if (callback !== undefined) { callback(result); }
                },
                (error) => {
                    console.log('Failed to retrieve motion');
                    console.log(error);
                }
            );
    }

    public GetByCamera(cameraId, dateStartsWith, callback) {
        console.log('MotionService.GetByCamera');

        if (cameraId == null) {
            console.log('  bad argument - cameraId');
            return 0;
        }
        const rkey = dateStartsWith !== null ? '&rkey=' + dateStartsWith : '';

        this.http.get(environment.apiHost + '/motion/bycamera?hkey=' + cameraId + rkey, this.httpOptions)
            .subscribe(
                (result: IMotionResult) => {
                    console.log(result);
                    if (callback !== undefined) { callback(result); }
                },
                (error) => {
                    console.log('Failed to retrieve motion');
                    console.log(error);
                }
            );
    }

    public Update(data: IMotion, callback) {
        console.log('MotionService.Update');
        this.http.put(environment.apiHost + '/motion', data, this.httpOptions)
            .subscribe(
                (result: IMotionResult) => {
                    console.log(result);
                    if (callback !== undefined) { callback(result); }
                },
                (error) => {
                    console.log('Failed to retrieve motion');
                    console.log(error);
                }
            );
    }

    public Delete(data: IMotion, callback) {
        console.log('MotionService.delete');

        this.http.delete(environment.apiHost + '/motion?id=' + data.Id, this.httpOptions)
            .subscribe(
                (result: IMotionResult) => {
                    console.log(result);
                    if (callback !== undefined) { callback(result); }
                },
                (error) => {
                    console.log('Failed to delete a motion');
                    console.log(error);
                }
            );
    }

}
