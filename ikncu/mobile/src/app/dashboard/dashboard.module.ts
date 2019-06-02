import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MotionComponent } from '../dashboard/motion/motion.component';
import { CloudViewComponent } from '../dashboard/cloud-view/cloud-view.component';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { DashboardComponent } from './dashboard.component';
import { ImageViewComponent } from './image-view/image-view.component';

@NgModule({
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
    MotionComponent
  ]
})
export class DashboardModule {}
