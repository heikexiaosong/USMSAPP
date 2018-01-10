import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ListPage} from "../list/list";
import {LoginPageModule} from "../login/login.module";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[LoginPageModule]
})
export class HomePage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
  listDrop(e){
     this.navCtrl.push(ListPage, { item:'' });
  }
  returnLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
}
