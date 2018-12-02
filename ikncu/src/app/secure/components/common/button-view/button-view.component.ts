import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-button-view',
  template: `
  <button type="button" class="btn btn-warning btn-raised" (click)="onClick($event)">
    <i class="ft-copy"></i> Copy camera ID to clipboard
  </button>
  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {

  @Input() value: string;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  onClick(event) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = 'Cam{' + this.rowData.id + '}';
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}

