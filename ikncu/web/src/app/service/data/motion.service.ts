import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

    public GetAll(callback) {
        console.log('MotionService.GetAll');

        const userId = this.authService.CognitoUser.id;

        this.http.get(environment.apiHost + '/motion/byuser?hkey=' + userId + '&rkey=1', this.httpOptions)
        .subscribe(
            (result: IMotionResult) => {
                console.log(result);
                if (callback !== undefined) { callback(result); }
            },
            (error) => {
                console.log('Failed to retrieve user');
                console.log(error);
            }
        );
    }

  public ListMotions(userId: String, cameraId: String, fromDate: String, toDate: String, callback) {
    // const filter = {
    //   // occurred: { between: [fromDate, toDate] },
    //   occurred: { beginsWith: fromDate.substr(0, 8) },
    //   userId: { eq: userId }
    // };
    // console.log(filter);
    // const query = API.graphql(graphqlOperation(queries.listMotions, {filter: filter , limit: 1000})) as Promise<GraphQLResult>;
    // const query = API.graphql(graphqlOperation(queries.getUser, {id: userId} )) as Promise<GraphQLResult>;
    // query.then((response) => {
    //   const a = <GetUserQuery>response.data;
    //   // console.log(a.getUser.motions);
    //   callback(a.getUser.motions);
    // });
  }

  // public Create(item: CreateMotionInput, callback) {
  //   console.log('Motion.Create');
  //   // const result = API.graphql(graphqlOperation(mutations.createMotion, {input: item})) as Promise<GraphQLResult>;
  //   // result.then((value) => {
  //   //   callback(value.data as CreateMotionMutation);
  //   // });
  // }

  // public Update(item: UpdateMotionInput, callback) {
  //   console.log('Motion.Update');
  //   // const result = API.graphql(graphqlOperation(mutations.updateMotion, {input: item})) as Promise<GraphQLResult>;
  //   // result.then((value) => {
  //   //   callback(value);
  //   // });
  // }

  // public Delete(item: DeleteMotionInput, callback) {
  //   console.log('Motion.delete');
  //   // const result = API.graphql(graphqlOperation(mutations.deleteMotion, {input: item})) as Promise<GraphQLResult>;
  //   // result.then((value) => {
  //   //   callback(value);
  //   // });
  // }

}
