import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ListPageModule} from "../pages/list/list.module";
import {ListDetailPageModule} from "../pages/list-detail/list-detail.module";
import {ListDetailInputPageModule} from "../pages/list-detail-input/list-detail-input.module";
import { HttpServiceProvider } from '../providers/http-service/http-service';
import {AuthenticationProvider} from "../providers/authentication";
import { AutologinPage } from '../pages/autologin/autologin';
import { LoginPage } from '../pages/login/login';
import { provideInterceptorService  } from 'ng2-interceptors';
import { HttpInterceptor } from '../interceptor/HttpInterceptor';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AutologinPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ListDetailPageModule,
    ListPageModule,
    ListDetailInputPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AutologinPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,HttpInterceptor,
    provideInterceptorService([
      HttpInterceptor
    ]),
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServiceProvider,
    AuthenticationProvider
  ]
})
export class AppModule {}
