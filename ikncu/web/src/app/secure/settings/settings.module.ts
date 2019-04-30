import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UiSwitchModule } from 'ngx-ui-switch';

import { BasicComponent } from './basic/basic.component';
import { LabelsComponent } from './labels/labels.component';
import { SettingsComponent } from './settings.component';
import { CamerasComponent } from './cameras/cameras.component';
import { FacesComponent } from './faces/faces.component';
import { TiersComponent } from './tiers/tiers.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CheckboxViewComponent } from '../components/common/checkbox-view/checkbox-view.component';
import { ButtonViewComponent } from '../components/common/button-view/button-view.component';
import { MatTabsModule } from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CategoryViewComponent } from '../components/common/category-view/category-view.component';
import { FaceViewComponent } from '../components/common/face-view/face-view.component';

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
    MatTabsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    SettingsComponent,
    BasicComponent,
    LabelsComponent,
    CamerasComponent,
    FacesComponent,
    TiersComponent,
    CheckboxViewComponent,
    CategoryViewComponent,
    ButtonViewComponent,
    FaceViewComponent,
  ],
  providers: [

  ],
  entryComponents: [
    CheckboxViewComponent,
    CategoryViewComponent,
    ButtonViewComponent,
    FaceViewComponent
  ]
})
export class SettingsModule { }
