import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ListPage} from "../list/list";
import {ReceiptPage} from "../receipt/receipt";
import {LoginPageModule} from "../login/login.module";
import {LoginPage} from "../login/login";
import {HttpServiceProvider} from "../../providers/http-service/http-service";
import {AppConfig} from "../../app/app.config";
import {NativeAudio} from "@ionic-native/native-audio";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[LoginPageModule]
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public service: HttpServiceProvider,
              public nativeAudio: NativeAudio,
              public navParams: NavParams) {
    setInterval(this.loopr.bind(this), 1000*60*5);
  }

  loopr(){
    this.service.list("system/funcdef/query/pending/T_PUR_Receive",{"field":"ZT","op":"=","value":"分配"}).then(data=>{
      let records = data.data.records||[];
      if  ( AppConfig.T_PUR_Receive.length < records.length ){
        console.log("HasNew: " + true);
        this.nativeAudio.play('click');
      } else {
        this.service.list("system/funcdef/query/pending/T_SAL_DELIVERYNOTICE",{"field":"ZT","op":"=","value":"分配"}).then(data=>{
          let records = data.data.records||[];
          if  ( AppConfig.T_SAL_DELIVERYNOTICE.length < records.length ){
            console.log("HasNew: " + true);
            this.nativeAudio.play('click');
          }
          console.log(JSON.stringify(AppConfig.T_PUR_Receive));
        });
      }
      console.log(JSON.stringify(AppConfig.T_PUR_Receive));
    });
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
