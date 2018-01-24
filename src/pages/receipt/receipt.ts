import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
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
              public toastCtrl: ToastController,
              public service:HttpServiceProvider,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    //this.loadDate();
    console.log('ionViewDidLoad ListPage');
  }

  ionViewWillEnter(){
    this.loadDate();
    console.log('ionViewWillEnter ListPage');
  }


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    const url = 'system/funcdef/query/pending/T_SAL_DELIVERYNOTICE';
    this.service.list(url,{"field":"ZT","op":"=","value":"分配"}).then(data=>{
      refresher.complete();
      if(data['data']){
        this.items = data.data.records||[];
      }else{
        let toast = this.toastCtrl.create({
          message: '数据请求失败',
          duration: 1000
        });
        toast.present();
      }
    });
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
    this.service.list(url,{"field":"ZT","op":"=","value":"分配"}).then(data=>{
      if(data['data']){
        loader.dismiss();
        this.items = data.data.records||[];
      }else{
        loader.dismiss();
        alert('请求数据失败');
      }

    });
  }

}
