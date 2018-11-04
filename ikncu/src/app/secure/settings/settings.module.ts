import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SettingsComponent } from './settings.component';
import { CurrentUserService } from 'src/app/service/common/current-user.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SettingsComponent
  ],
  declarations: [],
  providers: [
    CurrentUserService
  ]
})
export class SettingsModule { }
