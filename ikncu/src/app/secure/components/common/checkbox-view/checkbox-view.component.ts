import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-checkbox-view',
  template: `
  <ui-switch (change)="onChange($event)" [checked] = "renderValue"></ui-switch>
  `,
})
export class CheckboxViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    console.log(this.value);
    this.renderValue = this.value;
  }

  onChange(event) {
    this.rowData.active = event;
    this.save.emit(this.rowData);
  }
}

