import { Injectable } from '@angular/core';
// import { UpdateFaceInput, CreateFaceInput, CreateFaceMutation, DeleteFaceInput, GetFaceQuery } from 'src/graphql/types';
// import { API, graphqlOperation } from 'aws-amplify';
// import * as queries from '../../../graphql/queries';
// import * as mutations from '../../../graphql/mutations';
// import { GetUserQuery, UpdateUserInput } from '../../../graphql/types';
// import { GraphQLResult } from '@aws-amplify/api/lib/types';

@Injectable({
  providedIn: 'root'
})
export class FaceService {

  private _initialized = false;
  // private _data: [UpdateFaceInput];

  constructor() { }

  public Initialize(userId, callback) {
    // if (!this._initialized) {
    //   const query = API.graphql(graphqlOperation(queries.listFaces, {faceUserId: userId})) as Promise<GraphQLResult>;
    //   query.then((value) => {
    //     const user = value.data as GetFaceQuery;
    //     this._initialized = true;
    //     callback(this._initialized);
    //   });
    // } else {
    //   callback(this._initialized);
    // }
  }

  // public get Faces(): [UpdateFaceInput] {
  //   return this._initialized ? this._data : null;
  // }

  // public Create(item: CreateFaceInput, callback) {
  //   console.log('Face.Create');
  //   // const result = API.graphql(graphqlOperation(mutations.createFace, {input: item})) as Promise<GraphQLResult>;
  //   // result.then((value) => {
  //   //   callback(value.data as CreateFaceMutation);
  //   // });
  // }

  // public Update(item: UpdateFaceInput, callback) {
  //   console.log('Face.Update');
  //   // const result = API.graphql(graphqlOperation(mutations.updateFace, {input: item})) as Promise<GraphQLResult>;
  //   // result.then((value) => {
  //   //   callback(value);
  //   // });
  // }

  // public Delete(item: DeleteFaceInput, callback) {
  //   console.log('Face.delete');
  //   // const result = API.graphql(graphqlOperation(mutations.deleteFace, {input: item})) as Promise<GraphQLResult>;
  //   // result.then((value) => {
  //   //   callback(value);
  //   // });
  // }

}
