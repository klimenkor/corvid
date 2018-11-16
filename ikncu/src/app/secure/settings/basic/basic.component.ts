import { Component, OnInit } from '@angular/core';
import { ISetting, CurrentUser, IUser } from 'src/app/model/_index';
import { AmplifyService } from 'aws-amplify-angular';
import { CognitoUtil } from 'src/app/service/auth/cognito.service';
import { CurrentUserService } from 'src/app/service/common/current-user.service';

import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../../graphql/queries';
import * as mutations from '../../../../graphql/mutations';
import { UpdateUserMutation, GetUserQuery, UpdateUserInput } from '../../../../graphql/types';
import { GraphQLResult } from '@aws-amplify/api/lib/types';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-settings-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  emailChanged = false;
  user: UpdateUserInput;
  currentUser: CurrentUser;

  constructor(
    private currentUserService: CurrentUserService,
    private spinner: NgxSpinnerService) {
      this.currentUser = new CurrentUser;
      console.log('BasicComponent.constructor')
    }

  // getUser() {
  //   this.spinner.show();
  //   const result = API.graphql(graphqlOperation(queries.getUser, {id: this.currentUser.id})) as Promise<GraphQLResult>;

  //   result.then((value) => {
  //     const v = value.data as GetUserQuery;
  //     this.user = v.getUser;
  //     console.log(this.user);
  //     this.spinner.hide();
  //   });
  // }

  saveUser(event) {
    console.log('saveUser');

    const result = API.graphql(graphqlOperation(mutations.updateUser, {input: this.user})) as Promise<GraphQLResult>;
    result.then((value) => {
        event.confirm.resolve(event.newData);
    });

  }

  ngOnInit() {
    console.log('BasicComponent.ngOnInit')
    const currentUser = this.currentUserService.get();
    currentUser.then((value) => {
      this.currentUser = this.currentUserService.cognitoUser;
      this.user = this.currentUserService.user;
      console.log(this.user)
    });
  }

  onEmailChange(event) {
    this.emailChanged = true;
  }

}
