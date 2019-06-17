import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';


import { SettingsPage } from './settings.page';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SettingsRoutingModule
  ],
  declarations: [SettingsPage]
})
export class SettingsModule {}
