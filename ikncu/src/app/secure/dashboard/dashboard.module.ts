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
import { CanvasViewComponent } from '../components/common/canvas-view/canvas-view.component';

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
    })
  ],
  declarations: [
    DashboardComponent,
    MotionComponent,
    FaceComponent,
    ImageViewComponent,
    CanvasViewComponent
  ],
  providers: [

  ],
  entryComponents: [
    ImageViewComponent
  ]
})

export class DashboardModule { }
