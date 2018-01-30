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
import {ReceiptPageModule} from "../pages/receipt/receipt.module";
import {ReceiptDetailPageModule} from "../pages/receipt-detail/receipt-detail.module";
import {ReceiptDetailInputPageModule} from "../pages/receipt-detail-input/receipt-detail-input.module";
import { HttpServiceProvider } from '../providers/http-service/http-service';
import {AuthenticationProvider} from "../providers/authentication";
import { AutologinPage } from '../pages/autologin/autologin';
import { LoginPage } from '../pages/login/login';
import { BatchSelectPage } from '../pages/batch-select/batch-select';
import { provideInterceptorService  } from 'ng2-interceptors';
import { HttpInterceptor } from '../interceptor/HttpInterceptor';
import {ExpressSelectPage} from "../pages/express-select/express-select";
import {ExpressorderPage} from "../pages/expressorder/expressorder";
import {NativeAudio} from "@ionic-native/native-audio";
import {BatchInputPage} from "../pages/batch-input/batch-input";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AutologinPage,
    LoginPage,
    BatchSelectPage,
    ExpressSelectPage,
    ExpressorderPage,
    BatchInputPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ListPageModule,
    ListDetailPageModule,
    ListDetailInputPageModule,
    ReceiptPageModule,
    ReceiptDetailPageModule,
    ReceiptDetailInputPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AutologinPage,
    LoginPage,
    BatchSelectPage,
    BatchInputPage,
    ExpressSelectPage,
    ExpressorderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpInterceptor,
    NativeAudio,
    provideInterceptorService([
      HttpInterceptor
    ]),
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServiceProvider,
    AuthenticationProvider
  ]
})
export class AppModule {}
