import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cacheable, CacheBuster } from 'ngx-cacheable';
import { Subject } from 'rxjs';
import { IUser, ICreateUserResult } from '../model/user';
import { AuthService } from '../auth/service/auth.service';


const cacheBuster$ = new Subject<void>();

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

    public Init(callback) {
      this.Get().subscribe(
        (response) => {
          callback(response);
      });
    }

    @Cacheable({
        cacheBusterObserver: cacheBuster$
    })
    public Get() {
        console.log('UserService.Get');

        const userId = this.authService.CognitoUser.id;
        console.log('  userId=' + userId);

        return this.http.get(environment.apiHost + '/user?id=' + userId, this.httpOptions);
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

    @CacheBuster({
        cacheBusterNotifier: cacheBuster$
    })
    public Update(data: IUser) {
        console.log('UserService.Update');

        return this.http.put<ICreateUserResult>(environment.apiHost + '/user', data, this.httpOptions);
    }

}
