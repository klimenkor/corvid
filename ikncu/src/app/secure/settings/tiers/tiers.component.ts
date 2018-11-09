import { Component, OnInit, Query } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../../graphql/queries';
import * as mutations from '../../../../graphql/mutations';
import { ListTiersQuery, CreateTierMutation } from '../../../../graphql/types';
import { GraphQLResult } from '@aws-amplify/api/lib/types';
import { NgxSpinnerService } from 'ngx-spinner';

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
        editable: false
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

    source = [];

    constructor(private spinner: NgxSpinnerService) { }

    async ngOnInit() {

      this.spinner.show();

      const result = API.graphql(graphqlOperation(queries.listTiers)) as Promise<GraphQLResult>;

      result.then((value) => {
        const v = value.data as ListTiersQuery;
        this.source = v.listTiers.items;
        this.spinner.hide();
      });
    }

    onRowSelect(event) {
      console.log('onRowSelect');

    }

    onDeleteConfirm(event) {
        console.log('onDeleteConfirm');
        const item = {
            id: event.data.id
        };
        const result = API.graphql(graphqlOperation(mutations.deleteTier, {input: item})) as Promise<GraphQLResult>;
        result.then((value) => {
            event.confirm.resolve(event.newData);
        });
    }

    onSaveConfirm(event) {
        console.log('onSaveConfirm');
        const result = API.graphql(graphqlOperation(mutations.updateTier, {input: event.newData})) as Promise<GraphQLResult>;
        result.then((value) => {
            event.confirm.resolve(event.newData);
        });
    }

    async onCreateConfirm(event) {
      const item = {
        name: event.newData.name
      };

      const result = API.graphql(graphqlOperation(mutations.createTier, {input: item})) as Promise<GraphQLResult>;
      result.then((value) => {
        const v = value.data as CreateTierMutation;
        event.newData.id = v.createTier.id;
        event.confirm.resolve(event.newData);
      });
    }


}
