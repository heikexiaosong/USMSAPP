import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpServiceProvider} from '../../providers/http-service/http-service';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {ReceiptDetailInputPage} from '../receipt-detail-input/receipt-detail-input';
import {AppConfig} from "../../app/app.config";


/**
 * Generated class for the ReceiptDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receipt-detail',
  templateUrl: 'receipt-detail.html',
})
export class ReceiptDetailPage {

  public  listDetial= {};
  public master = {};
  public  data=[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public service:HttpServiceProvider,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController) {
    this.listDetial = this.navParams.data.item ;
    console.log(JSON.stringify(this.listDetial));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListDetailPage');
    this.loadDetail();
  }
  loadDetail(){
    let loader = this.loadingCtrl.create({
      content: "加载中..."
    });
    loader.present();
    const url='system/funcdef/details/T_SAL_DELIVERYNOTICE/' + this.listDetial["FBILLNO"];
    //const url ='CGSL10101000033.json';
    this.service.list(url,{}).then(data=>{
      loader.dismiss();
      if(data['data']){
        this.data = data['data'].t_Sal_Deliverynoticeentry.records;
      }
    });
  }
  logForm(){
    var details = [{
      id: 'T_SAL_DELIVERYNOTICEENTRY',
      extend: 't_Sal_Deliverynoticeentry',
      records: this.data
    }];

    this.listDetial["ZT"] = '提交';
    this.listDetial["flag"] = 'U';

    var data = {
      "master": this.listDetial,
      "details": details
    };
    console.log(JSON.stringify(data));
    this.service.post(AppConfig.getProUrl() + "system/funcdef/T_SAL_DELIVERYNOTICE/update", data);
  }
  dblList(item){
    let modal = this.modalCtrl.create(ReceiptDetailInputPage, item);
    modal.onDidDismiss(data => {
      console.log("Result: " + JSON.stringify(data));
      if(data){
        item["QUANTITY"] = data["num"];
      }

    });
    modal.present();
  }

}
