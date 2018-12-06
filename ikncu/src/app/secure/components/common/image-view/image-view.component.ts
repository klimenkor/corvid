import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-image-view',
  template: `
  <img [src] = "renderValue" style="width:30%;"/>
  `,
})
export class ImageViewComponent implements ViewCell, OnInit {
  renderValue: string;
  bucketPath = 'https://s3.amazonaws.com/corvid-frames/';

  @Input() value: string;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.bucketPath + this.value;
    // console.log(this.renderValue)
  }

}

