import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-cloud-view',
  template: `
      <angular-tag-cloud
        [data]="data"
        [width]="options.width"
        [height]="options.height"
        [overflow]="options.overflow">
      </angular-tag-cloud>
  `
})
export class CloudViewComponent implements ViewCell, OnInit {
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value
    width : 300,
    height : 200,
    overflow: false,
  };

  data: CloudData[] = [];

  @Input() value: string;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    JSON.parse(this.value).forEach(element => {
      this.data.push({text: element.name, weight: element.confidence, link: '/securehome/settings'});
    });
  }
}

