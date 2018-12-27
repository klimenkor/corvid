import { Injectable } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../graphql/queries';
import * as mutations from '../../../graphql/mutations';
import { GetUserQuery, UpdateUserInput, CreateUserInput, CreateUserMutation } from '../../../graphql/types';
import { GraphQLResult } from '@aws-amplify/api/lib/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _initialized = false;
  private _user: UpdateUserInput;

  constructor(
  ) {}

  public Initialize(userId, callback) {
    if (!this._initialized) {
      console.log('UserService.Initialize: userId' + userId);
      const query = API.graphql(graphqlOperation(queries.getUser, {id: userId, tierId: '1'})) as Promise<GraphQLResult>;
      // console.log('UserService.Initialize: 1');
      query.then((value) => {
        // console.log(value);
        const user = value.data as GetUserQuery;
        this._user = user.getUser;
        this._initialized = true;
        console.log('UserService.Initialize: before callback');
        callback(this._initialized);
        console.log('UserService.Initialize: after callback');
      });
    } else {
      console.log('UserService.Initialize: already');
      callback(this._initialized);
    }
  }

  public Create(item: CreateUserInput, callback) {
    console.log('User.Create');
    const result = API.graphql(graphqlOperation(mutations.createUser, {input: item})) as Promise<GraphQLResult>;
    result.then((value) => {
      callback(value.data as CreateUserMutation);
    });
  }

  public get User(): UpdateUserInput {
    return this._initialized ? this._user : null;
  }

  public Update(item: UpdateUserInput, callback) {
    console.log('User.Update');
    const result = API.graphql(graphqlOperation(mutations.updateUser, {input: item})) as Promise<GraphQLResult>;
    result.then((value) => {
      callback(value);
    });
  }

}
