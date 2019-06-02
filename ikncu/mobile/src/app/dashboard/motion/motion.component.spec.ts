import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotionComponent } from './motion.component';

describe('MotionComponent', () => {
  let component: MotionComponent;
  let fixture: ComponentFixture<MotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotionComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
