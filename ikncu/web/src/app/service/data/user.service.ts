import { Injectable } from '@angular/core';
import { IUser, IUserResult } from 'src/app/model/_index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {

  public User = null;
  private _initialized = false;
  // private _user: UpdateUserInput;

  constructor(
    private authService: AuthService,
    private http: HttpClient ) {
  }

  public Initialize(callback) {
    if (!this._initialized) {
      const userId = this.authService.CognitoUser.id;
      console.log('UserService.Initialize: userId=' + userId);

      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: this.authService.CognitoUser.jwtToken
        })};

      this.http.get('https://1hlgfthw33.execute-api.us-east-1.amazonaws.com/Stage/user?id=' + userId, httpOptions)
        .subscribe(
          (result: IUserResult) => {
            this.User = result.Item;
            this._initialized = true;
            if(callback !== undefined) { callback(this._initialized); }
            console.log('UserService.Initialize: after callback');
          },
          (error) => {
            console.log('Failed to retrieve user');
          }
        );
    }
  }

  public Create(data: IUser) {
    // this.authService.getAuthenticatedUser().getSession((err, session) => {
    //   if (err) {
    //     return;
    //   }
    //   this.http.post('https://1hlgfthw33.execute-api.us-east-1.amazonaws.com/Stage/user', data, {
    //     headers: new Headers({'Authorization': session.getIdToken().getJwtToken()})
    //   })
    //     .subscribe(
    //       (result) => {
    //           console.log('Create succeed');
    //       },
    //       (error) => {
    //         console.log('Create succeed');
    //       }
    //     );
    // });
  }

}

  // public Create(item: CreateUserInput, callback) {
  //   console.log('User.Create');
  //   const result = API.graphql(graphqlOperation(mutations.createUser, {input: item})) as Promise<GraphQLResult>;
  //   result.then((value) => {
  //     callback(value.data as CreateUserMutation);
  //   });
  // }

  // public get User(): UpdateUserInput {
  //   return this._initialized ? this._user : null;
  // }

  // public Update(item: UpdateUserInput, callback) {
  //   console.log('User.Update');
  //   const result = API.graphql(graphqlOperation(mutations.updateUser, {input: item})) as Promise<GraphQLResult>;
  //   result.then((value) => {
  //     callback(value);
  //   });
  // }

