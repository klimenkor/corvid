import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent, AboutComponent, HomeLandingComponent } from './public/home.component';
import { RegistrationConfirmationComponent } from './public/auth/confirm/confirmRegistration.component';
import { ResendCodeComponent } from './public/auth/resend/resendCode.component';
import { ForgotPassword2Component, ForgotPasswordStep1Component } from './public/auth/forgot/forgotPassword.component';
import { NewPasswordComponent } from './public/auth/newpassword/newpassword.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {path: 'about', component: AboutComponent},
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent},
            {path: 'confirmRegistration/:username', component: RegistrationConfirmationComponent},
            {path: 'resendCode', component: ResendCodeComponent},
            {path: 'forgotPassword/:email', component: ForgotPassword2Component},
            {path: 'forgotPassword', component: ForgotPasswordStep1Component},
            {path: 'newPassword', component: NewPasswordComponent},
            {path: '', component: HomeLandingComponent},
            {path: 'dashboard', component: DashboardComponent }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
