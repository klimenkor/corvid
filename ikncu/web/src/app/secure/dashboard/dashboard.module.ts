import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MotionComponent } from './motion/motion.component';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ImageViewComponent } from '../components/common/image-view/image-view.component';
import { CloudViewComponent } from '../components/common/cloud-view/cloud-view.component';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { FaceButtonComponent } from '../components/common/face-button/face-button.component';
import { FrameViewComponent } from '../components/common/frame-view/frame-view.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Ng5SliderModule } from 'ng5-slider';
import { FaceViewComponent } from '../components/common/face-view/face-view.component';
import { TimelineComponent } from './timeline/timeline.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxSpinnerModule,
    Ng2SmartTableModule,
    BrowserModule,
    BrowserAnimationsModule,
    UiSwitchModule.forRoot({
      size: 'medium',
      checkedLabel: 'yes',
      uncheckedLabel: 'no'
    }),
    TagCloudModule,
    Ng5SliderModule
  ],
  declarations: [
    DashboardComponent,
    MotionComponent,
    TimelineComponent,
    ImageViewComponent,
    CloudViewComponent,
    FaceButtonComponent,
    FrameViewComponent,
    FaceViewComponent
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  entryComponents: [
    ImageViewComponent,
    CloudViewComponent,
    FaceButtonComponent,
    FrameViewComponent
  ]
})

export class DashboardModule { }
