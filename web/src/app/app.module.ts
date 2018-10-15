import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RegisterComponent } from './views/register/register.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { LoggerService } from './service/common/logger.service';
import { ConsoleLoggerService } from './service/common/console-logger.service';
import { FormsModule } from '@angular/forms';
import { LogoutComponent, RegistrationConfirmationComponent } from './public/auth/confirm/confirmRegistration.component';
import { NewPasswordComponent } from './public/auth/newpassword/newpassword.component';
import { ResendCodeComponent } from './public/auth/resend/resendCode.component';
import { ForgotPasswordStep1Component, ForgotPassword2Component } from './public/auth/forgot/forgotPassword.component';
import { MFAComponent } from './public/auth/mfa/mfa.component';
import { AboutComponent, HomeLandingComponent, HomeComponent } from './public/home.component';
import { UseractivityComponent } from './secure/useractivity/useractivity.component';
import { MyProfileComponent } from './secure/profile/myprofile.component';
import { SecureHomeComponent } from './secure/landing/securehome.component';
import { JwtComponent } from './secure/jwttokens/jwt.component';

@NgModule({
  declarations: [
    NewPasswordComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationConfirmationComponent,
    ResendCodeComponent,
    ForgotPasswordStep1Component,
    ForgotPassword2Component,
    RegisterComponent,
    MFAComponent,
    AboutComponent,
    HomeLandingComponent,
    HomeComponent,
    UseractivityComponent,
    MyProfileComponent,
    SecureHomeComponent,
    JwtComponent,
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [ { provide: LoggerService, useClass: ConsoleLoggerService } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
