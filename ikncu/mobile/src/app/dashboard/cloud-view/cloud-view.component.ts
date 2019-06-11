import { Component, OnInit, Input } from '@angular/core';
import { CloudData, CloudOptions, ZoomOnHoverOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-cloud-view',
  template: `
    <div>
      <angular-tag-cloud
        [data]="data"
        [config]="options">
      </angular-tag-cloud>
    </div>
  `,
  styleUrls: ['cloud-view.component.scss']

})
export class CloudViewComponent implements OnInit {
  @Input() data: CloudData[];

  options: CloudOptions = {
    width : 0.8,
    height : 200,
    overflow: false,
    realignOnResize: false
  };

  ngOnInit() {}

  constructor() {}


}

