import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-face-view',
  template: `
  <button type="button" class="btn btn-outline-warning" *ngIf="facesFound" (click)="onClick($event)">
    <i class="icon-user-female"></i>
  </button>
  `
})
export class FaceViewComponent implements ViewCell, OnInit {
  facesFound = false;

  @Input() value: string;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    const faces = JSON.parse(this.value);
    this.facesFound = faces !== null && faces.length>0;
    if (this.facesFound) {
      // console.log(faces);
    }
  }

  onClick(event) {
    console.log('Face clicked');
  }


}

