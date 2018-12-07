import { Component, OnInit } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../../graphql/queries';
import * as shortid from 'node_modules/shortid';
import { ListFacesQuery, CreateFaceMutation, CreateFaceInput,
          UpdateFaceMutation, DeleteFaceMutation } from '../../../../graphql/types';
import { GraphQLResult } from '@aws-amplify/api/lib/types';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUserService } from 'src/app/service/common/current-user.service';
import { CurrentUser } from 'src/app/model/_index';
import { FaceService } from 'src/app/service/data/Face.service';

@Component({
  selector: 'app-settings-faces',
  templateUrl: './faces.component.html',
  styleUrls: ['./faces.component.css']
})
export class FacesComponent implements OnInit {

  settings = {
    columns: {
      name: {
        title: 'Name',
        filter: false,
      },
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
  currentUser: CurrentUser;

  constructor(
    private spinner: NgxSpinnerService,
    private currentUserService: CurrentUserService,
    private faceService: FaceService
  ) { }

  ngOnInit() {
    console.log('FacesComponent.ngOnInit');
    this.spinner.show();

    this.currentUserService.Initialize(() => {
      this.currentUser = this.currentUserService.User;
    });

    const result = API.graphql(graphqlOperation(queries.listFaces)) as Promise<GraphQLResult>;
    result.then((value) => {
      const v = value.data as ListFacesQuery;
      this.source = v.listFaces.items;
      this.spinner.hide();
    });
  }

  onDeleteConfirm(event) {
      console.log('onDeleteConfirm');
      const item = {
          id: event.data.id
      };
      this.faceService.Delete(item, (value) => {
        const v = value.data as DeleteFaceMutation;
        event.confirm.resolve(event.newData);
      });
  }

  onSaveConfirm(event) {
      console.log('onSaveConfirm');
      this.faceService.Update(event.newData, (value) => {
        const v = value.data as UpdateFaceMutation;
        event.newData.id = v.updateFace.id;
        event.confirm.resolve(event.newData);
      });
  }

  async onCreateConfirm(event) {
    const item = <CreateFaceInput>{
      id: shortid.generate(),
      name: event.newData.name,
      active: false,
      userId: this.currentUser.id,
    };
    this.faceService.Create(item, (value) => {
      event.newData.id = value.createFace.id;
      event.newData.shortid = value.createFace.shortid;
      event.newData.active = value.createFace.active;
      event.confirm.resolve(event.newData);
    });
  }

}
