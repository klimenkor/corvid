import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CurrentUserService } from 'src/app/service/common/current-user.service';
import { BasicComponent } from './basic/basic.component';
import { LabelsComponent } from './labels/labels.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    BasicComponent,
    LabelsComponent,
    Ng2SmartTableModule
  ],
  providers: [
    CurrentUserService
  ]
})
export class SettingsModule { }
