import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MotionPage } from './motion.page';
// import { FrameViewComponent } from './frame-view/frame-view.component';

const routes: Routes = [
  {
    path: '',
    component: MotionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MotionPage,
    // FrameViewComponent
  ]
})
export class MotionModule {}
