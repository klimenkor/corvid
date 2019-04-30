import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUser, IFace, IFaceResult, IFacesResult, IFaceDelete } from 'src/app/model/_index';
import { FaceService } from 'src/app/service/data/Face.service';
import { FaceViewComponent } from '../../components/common/face-view/face-view.component';
import { CategoryViewComponent } from '../../components/common/category-view/category-view.component';
import { UserService } from 'src/app/service/data/user.service';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-settings-faces',
  templateUrl: './faces.component.html',
  styleUrls: ['./faces.component.css']
})
export class FacesComponent implements OnInit {

  settings = {
    columns: {
      Frame: {
        title: 'Photo',
        filter: false,
        type: 'custom',
        renderComponent: FaceViewComponent
      },
      Name: {
        title: 'Name',
        filter: false,
        type: 'text'
      },
      CategoryId: {
        title: 'Category',
        type: 'custom',
        filter: false,
        renderComponent: CategoryViewComponent,
        editor: {
          type: 'list',
          config: {
            list: [{title: 'Family and friends', value: '1'}, {title: 'Utilities', value: '2'}, {title: 'Unknown', value: '4'}]
          }
        }
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

  // source = [];
  source: LocalDataSource;
  currentUser: CurrentUser;

  constructor(
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private faceService: FaceService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    console.log('FacesComponent.ngOnInit');
    this.spinner.show();


    this.userService.Get().subscribe(() => {
      this.faceService.Get().subscribe(
        (result: IFacesResult) => {
          console.log(result.Items);

          this.source = new LocalDataSource(
            result.Items.map(
              (item) => {
                return {
                  Id: item.Id,
                  Name: item.Name,
                  CategoryId: item.CategoryId,
                  Frame: this.authService.CognitoUser.id + '/' + item.Frame
                };
              }));
        });
        this.spinner.hide();
    });
  }

  onDeleteConfirm(event) {
      console.log('onDeleteConfirm');
      const item = {
          UserId: this.authService.CognitoUser.id,
          FaceId: event.data.Id
      } as IFaceDelete;
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

  // async onUpdate(event) {
  //   const item = {
  //     Id: event.newData.Id,
  //     UserId: event.newData.UserId,
  //     CategoryId: event.newData.CategoryId
  //   } as IFace;
  //   this.faceService.Create(item).subscribe(
  //       (value: IFaceResult) => {
  //       event.newData.Id = value.Item.Id;
  //       event.newData.CategoryId = value.Item.CategoryId;
  //       event.confirm.resolve(event.newData);
  //     });
  // }

}
