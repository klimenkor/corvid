import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFacePage } from './edit-face.page';

describe('EditFacePage', () => {
  let component: EditFacePage;
  let fixture: ComponentFixture<EditFacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFacePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
