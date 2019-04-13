import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NewPasswordComponent } from './public/auth/newpassword/newpassword.component';
import { LoginComponent } from './public/auth/login/login.component';
import { RegistrationConfirmationComponent } from './public/auth/confirm/confirmRegistration.component';
import { ResendCodeComponent } from './public/auth/resend/resendCode.component';
import { ForgotPasswordStep1Component, ForgotPassword2Component } from './public/auth/forgot/forgotPassword.component';
import { RegisterComponent } from './public/auth/register/registration.component';
import { MFAComponent } from './public/auth/mfa/mfa.component';
import { AboutComponent, PublicHomeLandingComponent, PublicHomeComponent } from './public/publicHome.component';
import { UseractivityComponent } from './secure/useractivity/useractivity.component';
import { MyProfileComponent } from './secure/profile/myprofile.component';
import { HomeComponent } from './secure/landing/home.component';
import { JwtComponent } from './secure/jwttokens/jwt.component';
import { SidebarComponent } from './secure/components/sidebar/sidebar.component';
import { HeaderComponent } from './secure/components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AwsUtil } from './service/auth/aws.service';
import { CognitoUtil } from './service/auth/cognito.service';
import { UserRegistrationService } from './service/auth/user-registration.service';
import { AuthService } from './service/auth/auth.service';
import { UserParametersService } from './service/auth/user-parameters.service';
import { DynamoDBService } from './service/auth/ddb.service';
import { CurrentUser } from './model/_index';
import { SettingsModule } from './secure/settings/settings.module';
import { DashboardModule } from './secure/dashboard/dashboard.module';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { UserService } from './service/data/user.service';
import { LogoutComponent } from './secure/logout/logout.component';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
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
    PublicHomeLandingComponent,
    HomeComponent,
    UseractivityComponent,
    MyProfileComponent,
    HomeComponent,
    JwtComponent,
    AppComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    TagCloudModule,
    NgbModule, // depricated in ng 4 .forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    SettingsModule,
    DashboardModule,
    SweetAlert2Module.forRoot(),
    MatDialogModule
  ],
  providers: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AwsUtil,
    CognitoUtil,
    UserRegistrationService,
    AuthService,
    UserParametersService,
    DynamoDBService,
    CurrentUser,
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
