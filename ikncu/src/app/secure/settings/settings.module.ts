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


@NgModule({
  imports: [
    FormsModule,
    NgbModule,
    Ng2SmartTableModule
  ],
  declarations: [
    SettingsComponent,
    BasicComponent,
    LabelsComponent,
    CamerasComponent,
    FacesComponent
  ],
  providers: [
    CurrentUserService
  ]
})
export class SettingsModule { }
