import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-face-view',
  template: `
  <img [src] = "frameUrl" style="height:200px;" (click)="onClick()"/>
  `,
})
export class FaceViewComponent implements ViewCell, OnInit {
  facesFound = false;

  bucketPath = environment.s3url + environment.facesBucket + '/';
  frameUrl: string;

  @Input() value: string;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.frameUrl = this.bucketPath + this.value;
    console.log(this.value);
  }

  onClick(event) {
    console.log('Face clicked');
  }

}

