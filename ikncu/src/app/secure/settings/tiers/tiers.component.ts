import { Component, OnInit } from '@angular/core';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../../graphql/queries';
import * as mutations from '../../../../graphql/mutations';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-settings-tiers',
  templateUrl: './tiers.component.html',
  styleUrls: ['./tiers.component.css']
})
export class TiersComponent implements OnInit {

    settings = {
        columns: {
          id: {
            title: 'ID',
            filter: false,
          },
          label: {
            title: 'Name',
            filter: false,
          }
        },
        attr: {
          class: 'table table-responsive'
        },
        edit: {
          editButtonContent: '<i class="ft-edit-2 info font-medium-1 mr-2"></i>'
        },
        delete: {
          deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-2"></i>'
        }
      };
    source = [
    {
        id: 1,
        label: 'Human'
    },
    {
        id: 2,
        label: 'Person'
    },
    {
        id: 3,
        label: 'Plant'
    },
    ];

    async ngOnInit(): Promise<void> {
        console.log(await API.graphql(graphqlOperation(queries.listTiers)));
    }

    // source: LocalDataSource;

    constructor() {
        // this.source = new LocalDataSource(this.data);
    }

    onDelete(event) {
        console.log('onDelete');
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

    onDeleteConfirm(event) {
        console.log('onDeleteConfirm');
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
