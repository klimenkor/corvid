import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { CurrentUser, IFacesResult, IFace } from 'src/app/model/_index';
import { FaceViewComponent } from '../../components/common/face-view/face-view.component';
import { LocalDataSource } from 'ng2-smart-table';
import { FaceService } from 'src/app/service/data/Face.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-dashboard-face',
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.css'],
  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `]
})
export class FaceComponent implements OnInit {

  settings = {
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
      // Id: {
      //   title: 'Id',
      //   filter: false,
      //   sortDirection: 'desc',
      //   width: '30%'
      // },
      CategoryId: {
        type: 'list',
        config: {
          list: [{title: 'Family and friends', value: '1'}, {title: 'Utilities', value: '2'}, {title: 'Unknown', value: '4'}]
        }
      },
      Frame: {
        title: '',
        filter: false,
        type: 'custom',
        renderComponent: FaceViewComponent
      }
    },
    actions: {
      add: false,
      edit: true,
      delete: true,
      custom: false,
      position:  'left',
    },
    attr: {
      class: 'table table-responsive'
    }
  };

  source: LocalDataSource;

  currentUser: CurrentUser;
  bucketPath = 'https://s3.amazonaws.com/corvid-frames/';

  @ViewChild('myCanvas') canvas: ElementRef;
  public context: CanvasRenderingContext2D;

  constructor(
    private faceService: FaceService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    console.log('FaceComponent.ngOnInit');
    this.spinner.show();

    this.faceService.Get().subscribe((response: IFacesResult) => {
      const list = [];
      response.Items.forEach(item => {
        list.push({
          Id: item.Id,
          CategoryId: item.CategoryId,
          Frame: JSON.stringify({
            Url: item.Frame,
            Location: item.Location
          })
        });
      });
      this.source = new LocalDataSource(list);
      this.spinner.hide();
    });
  }

}
