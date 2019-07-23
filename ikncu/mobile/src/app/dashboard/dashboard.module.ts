import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { CloudViewComponent } from '../dashboard/cloud-view/cloud-view.component';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { DashboardPage } from './dashboard.page';
import { ImageViewComponent } from './image-view/image-view.component';
import { DateSelectorComponent } from './date-selector/date-selector.component';
import { FaceButtonComponent } from './face-button/face-button.component';

import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    TagCloudModule,
    FormsModule,
    IonicModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardPage,
    CloudViewComponent,
    ImageViewComponent,
    FaceButtonComponent,
    DateSelectorComponent
  ],
  exports: [
    CloudViewComponent,
    ImageViewComponent,
    FaceButtonComponent
  ]
})
export class DashboardModule {}
