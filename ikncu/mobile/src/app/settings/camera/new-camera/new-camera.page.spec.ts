import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCameraPage } from './new-camera.page';

describe('NewCameraPage', () => {
  let component: NewCameraPage;
  let fixture: ComponentFixture<NewCameraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCameraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCameraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
