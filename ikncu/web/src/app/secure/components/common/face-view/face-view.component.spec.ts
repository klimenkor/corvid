import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceViewComponent } from './face-view.component';

describe('CloudViewComponent', () => {
  let component: FaceViewComponent;
  let fixture: ComponentFixture<FaceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
