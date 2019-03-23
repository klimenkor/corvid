import { Component, OnInit } from '@angular/core';
import * as shortid from 'node_modules/shortid';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUserService } from 'src/app/service/common/current-user.service';
import { CurrentUser, IFace, IFaceResult, IFacesResult } from 'src/app/model/_index';
import { FaceService } from 'src/app/service/data/Face.service';
import { FaceViewComponent } from '../../components/common/face-view/face-view.component';

@Component({
  selector: 'app-settings-faces',
  templateUrl: './faces.component.html',
  styleUrls: ['./faces.component.css']
})
export class FacesComponent implements OnInit {

  settings = {
    columns: {
      Id: {
        title: 'Id',
        filter: false
      },
      Frame: {
        title: 'Frame',
        filter: false,
        type: 'custom',
        renderComponent: FaceViewComponent
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

    this.faceService.Get().subscribe(
      (result: IFacesResult) => {
        this.source = result.Items;
        this.spinner.hide();
      });
  }

  onDeleteConfirm(event) {
      console.log('onDeleteConfirm');
      const item = {
          Id: event.data.Id
      } as IFace;
      this.faceService.Delete(item).subscribe(
        (value) => {
          event.confirm.resolve(event.newData);
        });
  }

  onSaveConfirm(event) {
      console.log('onSaveConfirm');
      this.faceService.Update(event.newData).subscribe(
          (value: IFaceResult) => {
            event.newData.Id = value.Item.Id;
            event.confirm.resolve(event.newData);
          });
  }

  async onCreateConfirm(event) {
    const item = {
      Id: shortid.generate(),
      UserId: '',
      CategoryId: ''
    } as IFace;
    this.faceService.Create(item).subscribe(
        (value: IFaceResult) => {
        event.newData.Id = value.Item.Id;
        event.newData.CategoryId = value.Item.CategoryId;
        event.confirm.resolve(event.newData);
      });
  }

}
