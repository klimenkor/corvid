import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/service/auth.service';
import { CognitoUtil } from './auth/service/cognito.service';
import { HttpClientModule } from '@angular/common/http';
import { AwsUtil } from './auth/service/aws.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    ScreenOrientation,
    StatusBar,
    SplashScreen,
    AuthService,
    AwsUtil,
    HttpClientModule,
    CognitoUtil,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
