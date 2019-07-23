import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { AuthGuard } from '../auth/login/auth.guard';

const routes: Routes = [
  {
    path: 'motion/:motionId',
    canLoad: [ AuthGuard ],
    loadChildren: './motion/motion.module#MotionModule'
  },
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
