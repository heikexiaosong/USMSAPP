import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
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

  public  isValidate = true;

  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              public service: HttpServiceProvider,
              public nativeAudio: NativeAudio,
              public navParams: NavParams) {
    setTimeout(this.loopr.bind(this), 1000);
    setInterval(this.loopr.bind(this), 1000*60*5);
    setInterval(this.validate.bind(this), 1000*30);
    this.isValidate = true;
  }

  validate(){
    if ( this.isValidate == true ) {
      console.log("isValidate: " + this.isValidate);
      this.service.postObservable(AppConfig.url +"/validate",{token: localStorage.getItem("auth_token")}).subscribe(
        data => {
          var validate = data.json().success || false;
          console.log("validate: " + validate);
          if ( !validate ){
            this.isValidate = false;
            this.alertController.create({ title:'信息提示', subTitle: data.json().message || "此账户在另一设备登陆！", buttons: [{text:'确定',handler: data => {
              this.navCtrl.setRoot(LoginPage)
            }}]}).present();
          }
        },
        err => console.error(err),
        () => {
          console.log('validate completed');
        }
      );
    }
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
    }else if(e == 2) {
      //发货通知单
      this.navCtrl.push(ReceiptPage, { item: e });
    }

  }
  returnLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
}
