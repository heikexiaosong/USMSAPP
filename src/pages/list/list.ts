import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import{ ListDetailPage} from '../list-detail/list-detail';
import {HttpServiceProvider} from '../../providers/http-service/http-service';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
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

  itemSelected(item) {
    item["title"] = "收料通知单详情";
    this.navCtrl.push(ListDetailPage, { item: item});
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    const url = 'system/funcdef/query/pending/T_PUR_Receive';
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

  loadDate(){
    let loader = this.loadingCtrl.create({
      content: "加载中..."
    });
    loader.present();
    //const url = 'T_PUR_Receive.jso';
    const url = 'system/funcdef/query/pending/T_PUR_Receive';
    this.service.list(url,{"field":"ZT","op":"=","value":"分配"}).then(data=>{
     if(data['data']){
       loader.dismiss();
       if( data.data.records.length > 0 ){
         this.items = data.data.records;
       }
     }else{
       loader.dismiss();
       let toast = this.toastCtrl.create({
         message: '数据请求失败',
         duration: 1000
       });
       toast.present();
     }

    });
  }
}
