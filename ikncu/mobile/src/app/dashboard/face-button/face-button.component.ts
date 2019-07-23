import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDetectedFace } from 'src/app/model/motion';

@Component({
  selector: 'app-face-button',
  template: `
  <ion-button type="button" class="btn btn-outline-warning" *ngIf="facesFound">
    <ion-icon name="person"></ion-icon>
  </ion-button>
  `
})
export class FaceButtonComponent implements OnInit {
  facesFound = false;

  @Input() faces: IDetectedFace[];

  ngOnInit() {
    this.facesFound = this.faces !== null && this.faces.length > 0;
  }

}

