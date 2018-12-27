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
import { FaceComponent } from './face/face.component';
import { CloudViewComponent } from '../components/common/cloud-view/cloud-view.component';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { FaceViewComponent } from '../components/common/face-view/face-view.component';
import { FrameViewComponent } from '../components/common/frame-view/frame-view.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxSpinnerModule,
    Ng2SmartTableModule,
    BrowserModule,
    UiSwitchModule.forRoot({
      size: 'medium',
      checkedLabel: 'yes',
      uncheckedLabel: 'no'
    }),
    TagCloudModule
  ],
  declarations: [
    DashboardComponent,
    MotionComponent,
    FaceComponent,
    ImageViewComponent,
    CloudViewComponent,
    FaceViewComponent,
    FrameViewComponent
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  entryComponents: [
    ImageViewComponent,
    CloudViewComponent,
    FaceViewComponent,
    FrameViewComponent
  ]
})

export class DashboardModule { }
