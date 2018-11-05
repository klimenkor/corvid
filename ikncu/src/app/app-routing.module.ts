import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { HomeComponent, AboutComponent, HomeLandingComponent } from './public/home.component';
import { RegistrationConfirmationComponent, LogoutComponent } from './public/auth/confirm/confirmRegistration.component';
import { ResendCodeComponent } from './public/auth/resend/resendCode.component';
import { ForgotPassword2Component, ForgotPasswordStep1Component } from './public/auth/forgot/forgotPassword.component';
import { NewPasswordComponent } from './public/auth/newpassword/newpassword.component';
import { LoginComponent } from './public/auth/login/login.component';
import { RegisterComponent } from './public/auth/register/registration.component';
import { SecureHomeComponent } from './secure/landing/securehome.component';
import { JwtComponent } from './secure/jwttokens/jwt.component';
import { MyProfileComponent } from './secure/profile/myprofile.component';
import { UseractivityComponent } from './secure/useractivity/useractivity.component';
import { BasicComponent } from './secure/settings/basic/basic.component';

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
    {path: '', component: HomeLandingComponent}
];

const secureHomeRoutes: Routes = [
  {

      path: '',
      redirectTo: '/securehome',
      pathMatch: 'full'
  },
  {
      path: 'securehome',
      component: SecureHomeComponent,
      children: [
        {path: 'logout', component: LogoutComponent},
        {path: 'dashboard', component: DashboardComponent },
        {path: 'jwttokens', component: JwtComponent},
        {path: 'myprofile', component: MyProfileComponent},
        {path: 'settings', component: BasicComponent},
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
          ...secureHomeRoutes,
          {
              path: '',
              component: HomeComponent
          }
      ]
  },

];

export const appRoutingProviders: any[] = [];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);

