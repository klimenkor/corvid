import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUserService } from 'src/app/service/common/current-user.service';
import { UserService } from 'src/app/service/data/user.service';
// import { UpdateUserInput } from 'src/graphql/types';
import { CurrentUser, IUser } from 'src/app/model/_index';

@Component({
  selector: 'app-settings-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LabelsComponent implements OnInit {

  settings = {
    columns: {
      id: {
        title: 'Id',
        filter: false,
      },
      name: {
        title: 'Name',
        filter: false,
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
    private currentUserService: CurrentUserService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    console.log('BasicComponent.ngOnInit');

    this.userService.Initialize((value1) => {
      this.currentUser = this.userService.User;
      console.log(CurrentUser);
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
          event.newData['name'] += ' + added in code';
          event.confirm.resolve(event.newData);
      } else {
          event.confirm.reject();
      }
  }

}
