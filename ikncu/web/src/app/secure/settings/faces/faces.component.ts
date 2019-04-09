import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUser, IFace, IFaceResult, IFacesResult } from 'src/app/model/_index';
import { FaceService } from 'src/app/service/data/Face.service';
import { FaceViewComponent } from '../../components/common/face-view/face-view.component';
import { UserService } from 'src/app/service/data/user.service';

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
      CategoryId: {
        type: 'list',
        config: {
          list: [{title: 'Family and friends', value: '1'}, {title: 'Utilities', value: '2'}, {title: 'Unknown', value: '4'}]
        }
      },
      Name: {
        title: 'Name',
        filter: false,
        type: 'string'
      }
    },
    add: {
      addButtonContent: '<div class="btn btn-outline-primary btn-round btn-block"><i class="ft-plus"></i></div>',
      createButtonContent: '<div class="btn btn-outline-success"><i class="ft-check"></i></div>',
      cancelButtonContent: '<div class="btn btn-outline-danger"><i class="ft-x"></i></div>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<div class="btn btn-outline-success btn-round"><i class="ft-edit-3"></i></div>',
      saveButtonContent: '<div class="btn btn-outline-success"><i class="ft-check"></i></div>',
      cancelButtonContent: '<div class="btn btn-outline-danger"><i class="ft-x"></i></div>',
      confirmCreate: false
    },
    delete: {
      deleteButtonContent: '<div class="btn btn-outline-success btn-round"><i class="ft-trash-2"></i></div>',
      confirmDelete: true
    },
    attr: {
      class: 'table table-responsive'
    }
  };

  source = [];
  currentUser: CurrentUser;

  constructor(
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private faceService: FaceService
  ) { }

  ngOnInit() {
    console.log('FacesComponent.ngOnInit');
    this.spinner.show();

    this.userService.Get().subscribe(() => {
      this.faceService.Get().subscribe(
        (result: IFacesResult) => {
          console.log(result.Items)
          this.source = result.Items;
          this.spinner.hide();
        });
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

  async onUpdate(event) {
    const item = {
      Id: event.newData.Id,
      UserId: event.newData.UserId,
      CategoryId: event.newData.CategoryId
    } as IFace;
    this.faceService.Create(item).subscribe(
        (value: IFaceResult) => {
        event.newData.Id = value.Item.Id;
        event.newData.CategoryId = value.Item.CategoryId;
        event.confirm.resolve(event.newData);
      });
  }

}
