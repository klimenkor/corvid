import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { ICategory } from 'src/app/model/category';

@Component({
  selector: 'app-category-view',
  template: `
  {{renderValue}}
  `,
})
export class CategoryViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string;
  @Input() list: ICategory[];
  @Input() rowData: any;


  ngOnInit() {
    this.list = [{Id: '1', Name: 'Family and friends'}, {Id: '2', Name: 'Utilities'}] as ICategory[];

    this.renderValue = this.list.find((element) => {
      return element.Id === this.value;
    }).Name;
  }

}

