import { Component, OnInit } from '@angular/core';
import * as shortid from 'node_modules/shortid';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUserService } from 'src/app/service/common/current-user.service';
import { CurrentUser, ICamerasResult } from 'src/app/model/_index';
import { CameraService } from 'src/app/service/data/camera.service';
import swal from 'sweetalert2';

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
        add: {
        addButtonContent: '<div class="btn btn-outline-primary"><i class="ft-plus"></i> Add new camera</div>',
        createButtonContent: '<div class="btn btn-outline-success"><i class="ft-check"></i></div>',
        cancelButtonContent: '<div class="btn btn-outline-danger"><i class="ft-x"></i></div>',
        confirmCreate: true
        },
        edit: {
        editButtonContent: '<i class="ft-edit-3"></i>',
        saveButtonContent: '<div class="btn btn-outline-success btn-sm"><i class="ft-check"></i></div>',
        cancelButtonContent: '<div class="btn btn-outline-danger btn-sm"><i class="ft-x"></i></div>',
        confirmCreate: false
        },
        delete: {
        deleteButtonContent: '<i class="ft-trash-2"></i>',
        confirmDelete: true
        },
        columns: {
        copy: {
            title: 'Camera token',
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
        },
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
            renderComponent: CheckboxViewComponent,
            // onComponentInitFunction: (instance) => {
            //   instance.save.subscribe(row => {
            //     this.save(
            //       <UpdateCameraInput>{
            //         id: row.id,
            //         name: row.name,
            //         active: row.active,
            //         userId: row.userId
            //       },
            //       () => { });
            //   });
            // }
        }
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
        // private currentUserService: CurrentUserService,
        public cameraService: CameraService
        ) {   }

    async ngOnInit() {
        console.log('CamerasComponent.ngOnInit');
        // this.spinner.show();

        this.userService.Get((user) => {

            this.cameraService.GetAll((result: ICamerasResult) => {
                this.source = result.Items;
                //   this.spinner.hide();
            });
        });
    }

    confirmDelete(item, callback) {
        // swal({
        //   title: 'Are you sure?',
        //   text: 'You won\'t be able to restore [' + item.name + '] afrer deleting this!',
        //   type: 'question',
        //   focusCancel: true,
        //   showCancelButton: true,
        //   confirmButtonColor: '#0CC27E',
        //   cancelButtonColor: '#FF586B',
        //   confirmButtonText: 'Yes, delete it!',
        //   cancelButtonText: 'No, cancel!',
        //   confirmButtonClass: 'btn btn-success btn-raised mr-5',
        //   cancelButtonClass: 'btn btn-danger btn-raised',
        //   buttonsStyling: false
        // }).then(function (response) {
        //   if (response.value) {
        //     callback();
        //   }
        // });
    }

    onDeleteConfirm(event) {
        console.log('onDeleteConfirm');
        console.log(this);

        this.confirmDelete(event.data, () => {
            const item = {
                id: event.data.id
            };
            // this.cameraService.Delete(item, (value) => {
            //   const v = value.data as DeleteCameraMutation;
            //   event.confirm.resolve(event.newData);
            // });
        });
    }

    save(item, callback) {
        console.log('save');
        item.userId = this.currentUser.id;
        console.log(item);
        // this.cameraService.Update(item, (value) => {
        //   const v = value.data as UpdateCameraMutation;
        //   callback();
        // });
    }

    onSaveConfirm(event) {
        console.log('onSaveConfirm');
        // const item = <UpdateCameraInput>{
        //   id: event.newData.id,
        //   name: event.newData.name,
        //   active: event.newData.active,
        //   userId: this.currentUser.id
        // };
        // this.save(item, () => {
        //   event.confirm.resolve(event.newData);
        // });
    }

    async onCreateConfirm(event) {
        // const item = <CreateCameraInput>{
        //   id: shortid.generate(),
        //   name: event.newData.name,
        //   active: false,
        //   userId: this.currentUser.id
        // };
        // this.cameraService.Create(item, (value) => {
        //   event.newData.id = value.createCamera.id;
        //   event.newData.name = value.createCamera.name;
        //   event.newData.active = value.createCamera.active;
        //   event.confirm.resolve(event.newData);
        // });
    }
}
