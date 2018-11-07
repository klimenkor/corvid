import { Component, OnInit, Query } from '@angular/core';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../../graphql/queries';
import * as mutations from '../../../../graphql/mutations';
import { ListTiersQuery, CreateTierMutation } from '../../../../graphql/types';


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
        confirmEdit: true
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

    constructor() { }

    ngOnInit() {
      const result = API.graphql(graphqlOperation(queries.listTiers)) as Promise<ListTiersQuery>;
      result.then((value) => {
        const v: ListTiersQuery = value;
        var a = value.listTiers;
        console.log(a);
        // this.source = v.listTiers.items;
        //this.source = value.data.listTiers.items;
      });
    }

    onRowSelect(event) {
      console.log('onRowSelect');

    }

    onDelete(event) {
        console.log('onDelete');
        if (window.confirm('Are you sure you want to delete?')) {
          console.log(event);

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

    async onCreateConfirm(event) {
      const item = {
        name: event.newData.name
      };

      const result = API.graphql(graphqlOperation(mutations.createTier, {input: item})) as Promise<CreateTierMutation>;
      result.then((value) => {
        // const v = value as CreateTierMutation;
        event.newData.id = value.createTier.id;
        event.confirm.resolve(event.newData);
      });
    }


}
