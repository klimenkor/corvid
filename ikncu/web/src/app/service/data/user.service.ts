import { Injectable } from '@angular/core';
import { IUser, IUserResult, ICreateUserResult } from 'src/app/model/_index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private user: IUser;
    private initialized = false;
    private httpOptions = {
        headers: new HttpHeaders({
        Authorization: this.authService.CognitoUser.jwtToken
    })};

    constructor(
        private authService: AuthService,
        private http: HttpClient ) {
    }

    public Get(callback) {
        console.log('UserService.Get');

        const userId = this.authService.CognitoUser.id;
        console.log('  userId=' + userId);

        this.http.get(environment.apiHost + '/user?id=' + userId, this.httpOptions)
            .subscribe(
            (result: IUserResult) => {
                this.user = result.Item;
                if (callback !== undefined) { callback(this.user); }
                console.log('UserService.Initialize: after callback');
            },
            (error) => {
                console.log('Failed to retrieve user');
                console.log(error);
            }
        );
    }

    public Create(data: IUser, callback) {
        console.log('UserService.Create');

        this.http.post(environment.apiHost + '/user', data, this.httpOptions)
        .subscribe(
            (result: ICreateUserResult) => {
                console.log(result);
                if (callback !== undefined) { callback(result); }
            },
            (error) => {
                console.log('Failed to retrieve user');
                console.log(error);
            }
        );
    }

    public get User(): IUser {
        return this.initialized ? this.user : null;
    }

    public Update(data: IUser, callback) {
        console.log('UserService.Update');

        this.http.put<ICreateUserResult>(environment.apiHost + '/user', data, this.httpOptions)
            .subscribe(
                (result: ICreateUserResult) => {
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
