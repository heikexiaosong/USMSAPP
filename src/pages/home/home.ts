import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ListPage} from "../list/list";
import {ReceiptPage} from "../receipt/receipt";
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
    if(e == 1){
      //收料通知单
      this.navCtrl.push(ListPage, { item: e });
    }else{
      //发货通知单
      this.navCtrl.push(ReceiptPage, { item: e });
    }

  }
  returnLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
}
