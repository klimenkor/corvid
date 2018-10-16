import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    declarations: [DashboardComponent],
    imports     : [
        BrowserModule,
        FormsModule
    ],

    providers   : []
})

export class DashboardModule { }
