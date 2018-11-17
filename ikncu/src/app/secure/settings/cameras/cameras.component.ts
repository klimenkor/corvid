import { Component, OnInit, Query } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../../graphql/queries';
import * as mutations from '../../../../graphql/mutations';
import * as shortid from 'node_modules/shortid';
import { ListCamerasQuery, CreateCameraMutation } from '../../../../graphql/types';
import { GraphQLResult } from '@aws-amplify/api/lib/types';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUserService } from 'src/app/service/common/current-user.service';
import { CurrentUser } from 'src/app/model/_index';

@Component({
  selector: 'app-settings-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.css']
})
export class CamerasComponent implements OnInit {

  settings = {
    columns: {
      // id: {
      //   title: 'ID',
      //   filter: false,
      //   editable: false
      // },
      name: {
        title: 'Name',
        filter: false,
      },
      shortid: {
        title: 'ShortId',
        filter: false,
        editable: false
      },
      // userid: {
      //   title: 'User',
      //   filter: false
      // },
      active: {
        title: 'Active',
        filter: false
      }
    },
    attr: {
      class: 'table table-responsive'
    },
    edit: {
      editButtonContent: '<i class="ft-edit-2 info font-medium-1 mr-2"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-2"></i>',
      confirmDelete: true
    },
    add: {
      confirmCreate: true
    }
  };

  source = [];
  user: CurrentUser;

  constructor(
    private spinner: NgxSpinnerService,
    private currentUserService: CurrentUserService
    ) {   }

  async ngOnInit() {
    console.log('CamerasComponent.ngOnInit');
    this.spinner.show();

    const result = API.graphql(graphqlOperation(queries.listCameras)) as Promise<GraphQLResult>;
    result.then((value) => {
      const v = value.data as ListCamerasQuery;
      this.source = v.listCameras.items;
      this.spinner.hide();
    });
  }

  onDeleteConfirm(event) {
      console.log('onDeleteConfirm');
      const item = {
          id: event.data.id
      };
      const result = API.graphql(graphqlOperation(mutations.deleteCamera, {input: item})) as Promise<GraphQLResult>;
      result.then((value) => {
          event.confirm.resolve(event.newData);
      });
  }

  onSaveConfirm(event) {
      console.log('onSaveConfirm');
      const result = API.graphql(graphqlOperation(mutations.updateCamera, {input: event.newData})) as Promise<GraphQLResult>;
      result.then((value) => {
          event.confirm.resolve(event.newData);
      });
  }

  async onCreateConfirm(event) {
    const item = {
      name: event.newData.name,
      shortid: shortid.generate(),
      active: false,
      userid: this.user.id
    };
    console.log(this.user.id);
    const result = API.graphql(graphqlOperation(mutations.createCamera, {input: item})) as Promise<GraphQLResult>;
    result.then((value) => {
      const v = value.data as CreateCameraMutation;
      event.newData.id = v.createCamera.id;
      event.confirm.resolve(event.newData);
    });
  }

}
