import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IFace, IFaceResult } from 'src/app/model/_index';

@Injectable()
export class FaceService {

    private httpOptions = {
        headers: new HttpHeaders({
        Authorization: this.authService.CognitoUser.jwtToken
    })};

    constructor(
        private authService: AuthService,
        private http: HttpClient ) {
    }

    public GetAll(callback) {
        console.log('FaceService.List');

        const userId = this.authService.CognitoUser.id;

        this.http.get(environment.apiHost + '/face/byuser?hkey=' + userId, this.httpOptions)
            .subscribe(
                (result: IFaceResult) => {
                    console.log(result);
                    if (callback !== undefined) { callback(result); }
                },
                (error) => {
                    console.log('Failed to retrieve face');
                    console.log(error);
                }
            );
    }

    public Create(data: IFace, callback) {
        console.log('FaceService.Create');

        this.http.post(environment.apiHost + '/camera', data, this.httpOptions)
        .subscribe(
            (result: IFaceResult) => {
                console.log(result);
                if (callback !== undefined) { callback(result); }
            },
            (error) => {
                console.log('Failed to retrieve user');
                console.log(error);
            }
        );
    }

    public Update(data: IFace, callback) {
        console.log('FaceService.Update');
        this.http.put(environment.apiHost + '/face', data, this.httpOptions)
            .subscribe(
                (result: IFaceResult) => {
                    console.log(result);
                    if (callback !== undefined) { callback(result); }
                },
                (error) => {
                    console.log('Failed to retrieve user');
                    console.log(error);
                }
            );
    }


    public Delete(data: IFace, callback) {
        console.log('FaceService.delete');

        this.http.delete(environment.apiHost + '/face?id=' + data.Id, this.httpOptions)
        .subscribe(
            (result: IFaceResult) => {
                console.log(result);
                if (callback !== undefined) { callback(result); }
            },
            (error) => {
                console.log('Failed to retrieve face');
                console.log(error);
            }
        );
    }

}
