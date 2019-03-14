import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-button-view',
  template: `
  <button type="button" class="btn btn-outline-warning btn-raised btn-sm" (click)="onClick($event)" [ngbTooltip]="cameraToken" >
    <i class="ft-copy"></i>
  </button>
  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  cameraToken = '';

  @Input() value: string;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.cameraToken = 'Cam{' + this.rowData.Id + '}';
  }

  onClick(event) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.cameraToken;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}

