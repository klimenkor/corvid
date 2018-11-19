import { Component, OnInit, Query } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../../graphql/queries';
import * as mutations from '../../../../graphql/mutations';
import * as shortid from 'node_modules/shortid';
import { ListCamerasQuery, CreateCameraMutation, CreateCameraInput,
          UpdateCameraMutation, DeleteCameraMutation } from '../../../../graphql/types';
import { GraphQLResult } from '@aws-amplify/api/lib/types';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUserService } from 'src/app/service/common/current-user.service';
import { CurrentUser } from 'src/app/model/_index';
import { CameraService } from 'src/app/service/data/camera.service';

@Component({
  selector: 'app-settings-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.css']
})
export class CamerasComponent implements OnInit {

  settings = {
    columns: {
      name: {
        title: 'Name',
        filter: false,
      },
      shortid: {
        title: 'ShortId',
        filter: false,
        editable: false
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
    private cameraService: CameraService
    ) {   }

  async ngOnInit() {
    console.log('CamerasComponent.ngOnInit');
    this.spinner.show();

    this.currentUserService.Initialize(() => {
      this.currentUser = this.currentUserService.User;
    });

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
      this.cameraService.Delete(item, (value) => {
        const v = value.data as DeleteCameraMutation;
        event.confirm.resolve(event.newData);
      });
  }

  onSaveConfirm(event) {
      console.log('onSaveConfirm');
      this.cameraService.Update(event.newData, (value) => {
        const v = value.data as UpdateCameraMutation;
        event.newData.id = v.updateCamera.id;
        event.confirm.resolve(event.newData);
      });
  }

  async onCreateConfirm(event) {
    const item = <CreateCameraInput>{
      name: event.newData.name,
      shortid: shortid.generate(),
      active: false,
      userid: this.currentUser.id,
      cameraUserId: this.currentUser.id
    };
    this.cameraService.Create(item, (value) => {
      event.newData.id = value.createCamera.id;
      event.newData.shortid = value.createCamera.shortid;
      event.newData.active = value.createCamera.active;
      event.confirm.resolve(event.newData);
    });
  }

}
