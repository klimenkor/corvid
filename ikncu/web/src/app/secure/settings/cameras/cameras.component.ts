import { Component, OnInit } from '@angular/core';
import * as shortid from 'node_modules/shortid';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUser, ICamerasResult, ICamera, ICameraResult } from 'src/app/model/_index';
import { CameraService } from 'src/app/service/data/camera.service';
// import swal from 'sweetalert2';
declare var swal: any;

import { CheckboxViewComponent } from '../../components/common/checkbox-view/checkbox-view.component';
import { ButtonViewComponent } from '../../components/common/button-view/button-view.component';
import { UserService } from 'src/app/service/data/user.service';

@Component({
  selector: 'app-settings-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.css']
})
export class CamerasComponent implements OnInit {

    settings = {
      columns: {
        Name: {
            title: 'Name',
            filter: false,
        },
        Active: {
            title: 'Active',
            filter: false,
            type: 'custom',
            editor: {
              type: 'checkbox'
            },
            renderComponent: CheckboxViewComponent
        },
        copy: {
          title: 'Token',
          filter: false,
          sort: false,
          type: 'custom',
          editable: false,
          renderComponent: ButtonViewComponent,
          onComponentInitFunction: (instance) => {
            instance.save.subscribe(row => {
                console.log('!!!');
            });
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
        editButtonContent: '<div class="btn btn-outline-primary btn-round"><i class="ft-edit-3"></i></div>',
        saveButtonContent: '<div class="btn btn-outline-success btn-sm"><i class="ft-check"></i></div>',
        cancelButtonContent: '<div class="btn btn-outline-danger btn-sm"><i class="ft-x"></i></div>',
        confirmCreate: false
      },
      delete: {
        deleteButtonContent: '<div class="btn btn-outline-primary btn-round"><i class="ft-trash-2"></i></div>',
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
        public cameraService: CameraService
        ) {   }

    async ngOnInit() {
        console.log('CamerasComponent.ngOnInit');
        this.spinner.show();

        this.userService.Get().subscribe((user) => {
            this.cameraService.Get().subscribe(
                (result: ICamerasResult) => {
                    this.source = result.Items;
                    this.spinner.hide();
                });
        });
    }

    confirmDelete(item, callback) {
        swal({
          title: 'Are you sure?',
          text: 'You won\'t be able to restore [' + item.name + '] afrer deleting this!',
          type: 'question',
          focusCancel: true,
          showCancelButton: true,
          confirmButtonColor: '#0CC27E',
          cancelButtonColor: '#FF586B',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          confirmButtonClass: 'btn btn-success btn-raised mr-5',
          cancelButtonClass: 'btn btn-danger btn-raised',
          buttonsStyling: false
        }).then((response) => {
          if (response.value) {
            callback();
          }
        });
    }

    onDeleteConfirm(event) {
        console.log('onDeleteConfirm');
        console.log(this);

        this.confirmDelete(event.data, () => {
            const item = {
                Id: event.data.id
            } as ICamera;
            this.cameraService.Delete(item).subscribe(
                (value: ICameraResult) => {
                    console.log(value.Item);
                    event.confirm.resolve(event.newData);
                });
        });
    }

    save(item, callback) {
        console.log('save');
        this.cameraService.Update(item).subscribe(
            (value: ICameraResult) => {
                console.log(value.Item);
                callback();
            });
    }

    onSaveConfirm(event) {
        console.log('onSaveConfirm');
        const item = {
          Id: event.newData.Id,
          Name: event.newData.Name,
          Active: event.newData.Active
        } as ICamera;
        this.save(item, () => {
          event.confirm.resolve(event.newData);
        });
    }

    async onCreateConfirm(event) {
        const item = {
          Id: shortid.generate(),
          UserId: '',
          Name: event.newData.Name,
          Active: 'false'
        } as ICamera;
        this.cameraService.Create(item).subscribe(
            // (value: ICameraResult) => {
            (value) => {
                console.log(value);
                event.newData.Id = item.Id;
                event.confirm.resolve(event.newData);
            });
    }
}
