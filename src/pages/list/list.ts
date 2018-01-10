import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ ListDetailPage} from '../list-detail/list-detail';
import {HttpServiceProvider} from '../../providers/http-service/http-service';
import { LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
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
              public navParams: NavParams,
              public service:HttpServiceProvider,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadDate();
    console.log('ionViewDidLoad ListPage');
  }
  itemSelected(item) {
    item["title"] = "出库单详情";
    this.navCtrl.push(ListDetailPage, { item: item });
  }
  loadDate(){
    let loader = this.loadingCtrl.create({
      content: "加载中..."
    });
    loader.present();
    this.service.list('/system/funcdef/T_SAL_OUTSTOCK/query',{}).then(data=>{
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
