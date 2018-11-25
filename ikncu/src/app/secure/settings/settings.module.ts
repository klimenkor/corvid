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
    SettingsComponent,
    BasicComponent,
    LabelsComponent,
    CamerasComponent,
    FacesComponent,
    TiersComponent,
    CheckboxViewComponent
  ],
  providers: [

  ],
  entryComponents: [
    CheckboxViewComponent
  ]
})
export class SettingsModule { }
