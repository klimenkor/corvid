import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MotionComponent } from '../dashboard/motion/motion.component';
import { CloudViewComponent } from '../dashboard/cloud-view/cloud-view.component';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { DashboardComponent } from './dashboard.component';
import { ImageViewComponent } from './image-view/image-view.component';
import { DateSelectorComponent } from './date-selector/date-selector.component';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    TagCloudModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent
      }
    ])
  ],
  declarations: [
    DashboardComponent,
    CloudViewComponent,
    ImageViewComponent,
    MotionComponent,
    DateSelectorComponent
  ],
  exports: [
    CloudViewComponent,
    ImageViewComponent
  ]
})
export class DashboardModule {}