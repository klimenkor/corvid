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

  bucketPath = environment.s3url + environment.rekognitionBucket + '/';
  frameUrl: string;

  @Input() value: string;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    const data = JSON.parse(this.value);
    this.frameUrl = this.bucketPath + data.Url;
  }

  onClick(event) {
    console.log('Face clicked');
  }

}

