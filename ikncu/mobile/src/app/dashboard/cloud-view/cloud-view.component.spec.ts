import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudViewComponent } from './cloud-view.component';

describe('CloudViewComponent', () => {
  let component: CloudViewComponent;
  let fixture: ComponentFixture<CloudViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudViewComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
