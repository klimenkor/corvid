import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDetectedFace } from 'src/app/model/motion';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-view',
  template: `
  <img [src] = "frameUrl" style="width:100%;"/>
  `,
})
export class ImageViewComponent implements OnInit {

  constructor() {}
  bucketPath = environment.s3url + environment.rekognitionBucket + '/';

  frameUrl: string;

  @Input() frame: string;
  @Input() faces: IDetectedFace[];
  @Output() click: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.frameUrl = this.bucketPath + this.frame;
  }
}

