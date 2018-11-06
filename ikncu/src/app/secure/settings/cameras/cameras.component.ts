import { Component, OnInit } from '@angular/core';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../../graphql/queries';
import * as mutations from '../../../../graphql/mutations';

@Component({
  selector: 'app-settings-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.css']
})
export class CamerasComponent implements OnInit {

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

  constructor() {
  }


  async ngOnInit() {
    const item = {
      shortid: '111',
      name: 'Camera 1',
      cameraUserId: '07d30fee-a0cd-4153-ae4e-7e8cd97f67ed',
      cameraMotionsId: null
    };
    // const newTodo = await API.graphql(graphqlOperation(mutations.createCamera, {input: item}));
    // console.log(newTodo);

    await API.graphql(graphqlOperation(queries.listCameras))
    console.log(await API.graphql(graphqlOperation(queries.listCameras)));
  }

}
