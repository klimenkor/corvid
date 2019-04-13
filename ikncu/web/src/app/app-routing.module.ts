import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { PublicHomeComponent, AboutComponent, PublicHomeLandingComponent } from './public/publicHome.component';
import { RegistrationConfirmationComponent } from './public/auth/confirm/confirmRegistration.component';
import { ResendCodeComponent } from './public/auth/resend/resendCode.component';
import { ForgotPassword2Component, ForgotPasswordStep1Component } from './public/auth/forgot/forgotPassword.component';
import { NewPasswordComponent } from './public/auth/newpassword/newpassword.component';
import { LoginComponent } from './public/auth/login/login.component';
import { RegisterComponent } from './public/auth/register/registration.component';
import { HomeComponent } from './secure/landing/home.component';
import { JwtComponent } from './secure/jwttokens/jwt.component';
import { MyProfileComponent } from './secure/profile/myprofile.component';
import { UseractivityComponent } from './secure/useractivity/useractivity.component';
import { SettingsComponent } from './secure/settings/settings.component';
import { LogoutComponent } from './secure/logout/logout.component';
import { BasicComponent } from './secure/settings/basic/basic.component';
import { LabelsComponent } from './secure/settings/labels/labels.component';
import { CamerasComponent } from './secure/settings/cameras/cameras.component';
import { FacesComponent } from './secure/settings/faces/faces.component';

const homeRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {path: 'about', component: AboutComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'confirmRegistration/:username', component: RegistrationConfirmationComponent},
    {path: 'resendCode', component: ResendCodeComponent},
    {path: 'forgotPassword/:email', component: ForgotPassword2Component},
    {path: 'forgotPassword', component: ForgotPasswordStep1Component},
    {path: 'newPassword', component: NewPasswordComponent},
    {path: '', component: PublicHomeLandingComponent}
];

const HomeRoutes: Routes = [
  {

      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
  },
  {
      path: 'home',
      component: HomeComponent,
      children: [
        {path: 'logout', component: LogoutComponent},
        {path: 'dashboard', component: DashboardComponent },
        {path: 'jwttokens', component: JwtComponent},
        {path: 'myprofile', component: MyProfileComponent},
        {path: 'settings', component: SettingsComponent,
        children: [
          { path: 'basic', component: BasicComponent },
          { path: 'labels', component: LabelsComponent },
          { path: 'cameras', component: CamerasComponent },
          { path: 'faces', component: FacesComponent }
        ]
        },

        {path: 'useractivity', component: UseractivityComponent},
        {path: '', component: DashboardComponent }
      ]
  }
];

const routes: Routes = [
  {
      path: '',
      children: [
          ...homeRoutes,
          ...HomeRoutes,
          {
              path: '',
              component: HomeComponent
          }
      ]
  },

];

export const appRoutingProviders: any[] = [];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);

