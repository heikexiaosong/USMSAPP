import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ ReceiptDetailPage} from '../receipt-detail/receipt-detail';
import {HttpServiceProvider} from '../../providers/http-service/http-service';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the ReceiptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html',
})
export class ReceiptPage {
  public  items = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public service:HttpServiceProvider,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadDate();
    console.log('ionViewDidLoad ListPage');
  }
  itemSelected(item) {
    item["title"] = "发货通知单详情";
    this.navCtrl.push(ReceiptDetailPage, { item: item });
  }
  loadDate(){
    let loader = this.loadingCtrl.create({
      content: "加载中..."
    });
    loader.present();
    //const url = 'T_SAL_DELIVERYNOTICE.jso';
    const url = 'system/funcdef/query/pending/T_SAL_DELIVERYNOTICE';
    this.service.list(url,{"field":"ZT","op":"=","value":"I"}).then(data=>{
      if(data['data']){
        loader.dismiss();
        if( data.data.records.length > 0 ){
          this.items = data.data.records;
        }
      }else{
        loader.dismiss();
        alert('请求数据失败');
      }

    });
  }

}
