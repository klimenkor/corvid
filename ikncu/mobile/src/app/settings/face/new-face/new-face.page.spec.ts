import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFacePage } from './new-face.page';

describe('NewFacePage', () => {
  let component: NewFacePage;
  let fixture: ComponentFixture<NewFacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFacePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
