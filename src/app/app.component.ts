import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AutologinPage} from "../pages/autologin/autologin";
import {NativeAudio} from "@ionic-native/native-audio";
import {HttpServiceProvider} from "../providers/http-service/http-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = AutologinPage;

  constructor(platform: Platform,
               statusBar: StatusBar,
               nativeAudio: NativeAudio,
               splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      nativeAudio.preloadSimple('click', 'audio/notic.mp3')
        .then(function (msg) {
          console.log(msg);
        }, function (error) {
          console.log(error);
        });

    });
  }
}

