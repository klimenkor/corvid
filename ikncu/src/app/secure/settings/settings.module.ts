import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { CurrentUserService } from 'src/app/service/common/current-user.service';

import { BasicComponent } from './basic/basic.component';
import { LabelsComponent } from './labels/labels.component';
import { SettingsComponent } from './settings.component';
import { CamerasComponent } from './cameras/cameras.component';
import { FacesComponent } from './faces/faces.component';
import { TiersComponent } from './tiers/tiers.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    Ng2SmartTableModule
  ],
  declarations: [
    SettingsComponent,
    BasicComponent,
    LabelsComponent,
    CamerasComponent,
    FacesComponent,
    TiersComponent
  ],
  providers: [
    CurrentUserService
  ]
})
export class SettingsModule { }
