import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MotionComponent } from './motion/motion.component';

@NgModule({
    declarations: [
      DashboardComponent,
      MotionComponent
    ],
    imports     : [
        BrowserModule,
        FormsModule,
        NgbModule
    ],
    providers   : []
})

export class DashboardModule { }
