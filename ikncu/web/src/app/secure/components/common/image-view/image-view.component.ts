import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ViewCell } from 'ng2-smart-table';
import { FrameViewComponent } from '../frame-view/frame-view.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-view',
  template: `
  <img [src] = "frameUrl" style="height:200px;" (click)="onClick()"/>
  `,
})
export class ImageViewComponent implements ViewCell, OnInit {

  constructor(public dialog: MatDialog) {}
  bucketPath = 'https://s3.amazonaws.com/' + environment.rekognitionBucket + '/';

  frameUrl: string;
  faces;

  @Input() value: string;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    const data = JSON.parse(this.value);
    this.frameUrl = this.bucketPath + data.Url;
    this.faces = data.Faces;
  }

  onClick() {
    this.dialog.open(FrameViewComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      hasBackdrop: false,
      disableClose: false,
      autoFocus: true,
      data: { url: this.frameUrl, faces: this.faces }
    });
  }

}

