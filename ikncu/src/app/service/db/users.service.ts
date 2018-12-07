import { Injectable } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../graphql/queries';
import * as mutations from '../../../graphql/mutations';
import { GetUserQuery, UpdateUserMutation } from '../../../graphql/types';
import { GraphQLResult } from '@aws-amplify/api/lib/types';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

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

    private _data = null;
    private _callback = null;

    constructor(callback) {
        this._callback = callback;
        const result = API.graphql(graphqlOperation(queries.getUser)) as Promise<GraphQLResult>;

        result.then((value) => {
            const v = value.data as GetUserQuery;
            this._data = v.getUser;
            this._callback();
        });
    }

    public get data() {
        return this._data;
    }

    public set data(_modified) {
        this._data = _modified;
        const result = API.graphql(graphqlOperation(mutations.updateUser, {input: this._data})) as Promise<GraphQLResult>;

        result.then((value) => {
            this._callback();
        });

    }

}
