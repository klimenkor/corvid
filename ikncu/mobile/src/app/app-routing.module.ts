import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' }
];

@NgModule({
  // imports: [
  //   RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  // ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
