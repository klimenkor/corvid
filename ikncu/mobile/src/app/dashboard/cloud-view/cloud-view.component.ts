import { Component, Input } from '@angular/core';
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
export class CloudViewComponent {
  options: CloudOptions = {
    width : 0.8,
    height : 200,
    overflow: false,
    realignOnResize: true,
    // zoomOnHover: {
    //   scale: 1.3,
    //   transitionTime: 1.2,
    //   color: '#aaaaaa'
    // }
  };

  @Input() data: CloudData[];

  zoomOnHoverOptions: ZoomOnHoverOptions = {
    scale: 1.3, // Elements will become 130 % of current zize on hover
    transitionTime: 1.2, // it will take 1.2 seconds until the zoom level defined in scale property has been reached
    delay: 0.8 // Zoom will take affect after 0.8 seconds
  };

}

