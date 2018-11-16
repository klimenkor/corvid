import { Injectable } from '@angular/core';
import { CurrentUser } from '../../model/_index';
import { AmplifyService } from 'aws-amplify-angular';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../graphql/queries';
import * as mutations from '../../../graphql/mutations';
import { UpdateUserMutation, GetUserQuery, UpdateUserInput } from '../../../graphql/types';
import { GraphQLResult } from '@aws-amplify/api/lib/types';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  public cognitoUser: CurrentUser = new CurrentUser;
  public user: UpdateUserInput;

  constructor(
    public amplifyService: AmplifyService
    ) {
    }

  async get() {
    if (this.cognitoUser === undefined) {
      const currentUser = this.amplifyService.auth().currentUserInfo();
      currentUser.then((value) => {
        this.cognitoUser.id = value.attributes.sub;
        this.cognitoUser.email = value.attributes.email;
        this.cognitoUser.name = value.username;

        console.log(this.cognitoUser.id);
        const dbUser = API.graphql(graphqlOperation(queries.getUser, {id: this.cognitoUser.id})) as Promise<GraphQLResult>;
        dbUser.then((value1) => {
          const v = value1.data as GetUserQuery;
          this.user = v.getUser;
        });
      });
    }
  }

}
