import { Injectable } from '@angular/core';
import { UpdateCameraInput, CreateCameraInput, CreateCameraMutation, DeleteCameraInput } from 'src/graphql/types';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../graphql/queries';
import * as mutations from '../../../graphql/mutations';
import { GetUserQuery, UpdateUserInput } from '../../../graphql/types';
import { GraphQLResult } from '@aws-amplify/api/lib/types';
import * as shortid from 'node_modules/shortid';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private _initialized = false;
  private _data: [UpdateCameraInput];

  constructor(
  ) {}

  public Initialize(userId, callback) {
    // if (!this._initialized) {
    //   const query = API.graphql(graphqlOperation(queries.listCameras, {cameraUserId: userId})) as Promise<GraphQLResult>;
    //   query.then((value) => {
    //     const user = value.data as GetUserQuery;
    //     this._initialized = true;
    //     callback(this._initialized);
    //   });
    // } else {
    //   callback(this._initialized);
    // }
  }

  public get Cameras(): [UpdateCameraInput] {
    return this._initialized ? this._data : null;
  }

  public Create(item: CreateCameraInput, callback) {
    console.log('Camera.Create');

    const result = API.graphql(graphqlOperation(mutations.createCamera, {input: item})) as Promise<GraphQLResult>;
    result.then((value) => {
      callback(value.data as CreateCameraMutation);
    });
  }

  public Update(item: UpdateCameraInput, callback) {
    console.log('Camera.Update');
    const result = API.graphql(graphqlOperation(mutations.updateCamera, {input: item})) as Promise<GraphQLResult>;
    result.then((value) => {
      callback(value);
    });
  }

  public Delete(item: DeleteCameraInput, callback) {
    console.log('Camera.delete');
    const result = API.graphql(graphqlOperation(mutations.deleteCamera, {input: item})) as Promise<GraphQLResult>;
    result.then((value) => {
      callback(value);
    });
  }
}
