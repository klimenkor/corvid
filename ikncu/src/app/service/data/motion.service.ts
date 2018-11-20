import { Injectable } from '@angular/core';
import { UpdateMotionInput, CreateMotionInput, CreateMotionMutation, DeleteMotionInput } from 'src/graphql/types';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../graphql/queries';
import * as mutations from '../../../graphql/mutations';
import { GetUserQuery, UpdateUserInput } from '../../../graphql/types';
import { GraphQLResult } from '@aws-amplify/api/lib/types';

@Injectable({
  providedIn: 'root'
})
export class MotionService {

  private _initialized = false;
  private _data: [UpdateMotionInput];

  constructor() { }

  public Initialize(userId, callback) {
    if (!this._initialized) {
      const query = API.graphql(graphqlOperation(queries.listMotions, {MotionUserId: userId})) as Promise<GraphQLResult>;
      query.then((value) => {
        const user = value.data as GetUserQuery;
        this._initialized = true;
        callback(this._initialized);
      });
    } else {
      callback(this._initialized);
    }
  }

  public get Motions(): [UpdateMotionInput] {
    return this._initialized ? this._data : null;
  }

  public Create(item: CreateMotionInput, callback) {
    console.log('Motion.Create');
    const result = API.graphql(graphqlOperation(mutations.createMotion, {input: item})) as Promise<GraphQLResult>;
    result.then((value) => {
      callback(value.data as CreateMotionMutation);
    });
  }

  public Update(item: UpdateMotionInput, callback) {
    console.log('Motion.Update');
    const result = API.graphql(graphqlOperation(mutations.updateMotion, {input: item})) as Promise<GraphQLResult>;
    result.then((value) => {
      callback(value);
    });
  }

  public Delete(item: DeleteMotionInput, callback) {
    console.log('Motion.delete');
    const result = API.graphql(graphqlOperation(mutations.deleteMotion, {input: item})) as Promise<GraphQLResult>;
    result.then((value) => {
      callback(value);
    });
  }

}