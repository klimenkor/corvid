import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/service/data/user.service';
import { IUser, IUserResult } from 'src/app/model/_index';

@Component({
  selector: 'app-settings-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LabelsComponent implements OnInit {

  settings = {
    columns: {
      Name: {
        title: 'Name',
        filter: false,
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

  source: LocalDataSource;
  filterSource: LocalDataSource;
  alertSource: LocalDataSource;

  currentUser = {
    Id: '',
    Name: '',
    Email: ''
  } as IUser;

  constructor(
    private spinner: NgxSpinnerService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    console.log('BasicComponent.ngOnInit');
    this.spinner.show();

    this.userService.Get().subscribe((result: IUserResult) => {
        this.currentUser = result.Item;
        this.source = new LocalDataSource(
          this.currentUser.Labels.map((name) => {
              return { Name: name };
          }));
          this.spinner.hide();
        });
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
        event.confirm.resolve();
    } else {
        event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
      if (window.confirm('Are you sure you want to save?')) {
          event.newData['name'] += ' + added in code';
          event.confirm.resolve(event.newData);
      } else {
          event.confirm.reject();
      }
  }

  onCreateConfirm(event) {
      if (window.confirm('Are you sure you want to create?')) {
          event.newData['Name'] += ' + added in code';
          event.confirm.resolve(event.newData);
      } else {
          event.confirm.reject();
      }
  }

}
