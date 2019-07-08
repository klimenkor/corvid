import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLabelPage } from './new-label.page';

describe('NewLabelPage', () => {
  let component: NewLabelPage;
  let fixture: ComponentFixture<NewLabelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLabelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLabelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
