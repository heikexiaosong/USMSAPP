import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthenticationProvider} from "../../providers/authentication";
import {HomePage} from "../home/home";
import {LoginPage} from "../login/login";


@IonicPage()
@Component({
  selector: 'page-autologin',
  templateUrl: 'autologin.html',
})
export class AutologinPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authProvider: AuthenticationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutologinPage');

    if ( this.authProvider.isAuth() ){
      this.navCtrl.setRoot(HomePage);
    } else {
      this.navCtrl.setRoot(LoginPage);
    }
  }

}
