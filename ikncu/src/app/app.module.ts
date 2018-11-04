import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { AppComponent } from './app.component';
import { NewPasswordComponent } from './public/auth/newpassword/newpassword.component';
import { LoginComponent } from './public/auth/login/login.component';
import { LogoutComponent, RegistrationConfirmationComponent } from './public/auth/confirm/confirmRegistration.component';
import { ResendCodeComponent } from './public/auth/resend/resendCode.component';
import { ForgotPasswordStep1Component, ForgotPassword2Component } from './public/auth/forgot/forgotPassword.component';
import { RegisterComponent } from './public/auth/register/registration.component';
import { MFAComponent } from './public/auth/mfa/mfa.component';
import { AboutComponent, HomeLandingComponent, HomeComponent } from './public/home.component';
import { UseractivityComponent } from './secure/useractivity/useractivity.component';
import { MyProfileComponent } from './secure/profile/myprofile.component';
import { SecureHomeComponent } from './secure/landing/securehome.component';
import { JwtComponent } from './secure/jwttokens/jwt.component';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { SidebarComponent } from './secure/components/sidebar/sidebar.component';
import { HeaderComponent } from './secure/components/header/header.component';
import { SettingsComponent } from './secure/settings/settings.component';
import { AppRoutingModule } from './app-routing.module';
import { AwsUtil } from './service/auth/aws.service';
import { CognitoUtil } from './service/auth/cognito.service';
import { UserRegistrationService } from './service/auth/user-registration.service';
import { UserLoginService } from './service/auth/user-login.service';
import { UserParametersService } from './service/auth/user-parameters.service';
import { DynamoDBService } from './service/auth/ddb.service';
import { CurrentUser } from './model/_index';

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
    HeaderComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    AmplifyAngularModule
  ],
  providers: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AmplifyService,
    AwsUtil,
    CognitoUtil,
    UserRegistrationService,
    UserLoginService,
    UserParametersService,
    DynamoDBService,
    CurrentUser
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
