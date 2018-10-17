import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
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
import { LoginComponent } from './public/auth/login/login.component';
import { RegisterComponent } from './public/auth/register/registration.component';
import { CognitoUtil } from './service/auth/cognito.service';
import { AwsUtil } from './service/auth/aws.service';
import { DynamoDBService } from './service/auth/ddb.service';
import { UserRegistrationService } from './service/auth/user-registration.service';
import { UserLoginService } from './service/auth/user-login.service';
import { UserParametersService } from './service/auth/user-parameters.service';
import { SidebarComponent } from './secure/components/sidebar/sidebar.component';
import { HeaderComponent } from './secure/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    DashboardComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [
      CognitoUtil,
      AwsUtil,
      DynamoDBService,
      UserRegistrationService,
      UserLoginService,
      UserParametersService,
    { provide: LoggerService, useClass: ConsoleLoggerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
