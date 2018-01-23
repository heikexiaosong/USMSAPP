import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpServiceProvider} from '../../providers/http-service/http-service';
import {ListDetailInputPage} from '../list-detail-input/list-detail-input';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the ListDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-detail',
  templateUrl: 'list-detail.html',
})
export class ListDetailPage {
  public  listDetial= [];
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
    const url='system/funcdef/details/T_PUR_Receive/' + this.listDetial["FBILLNO"];
    //const url ='CGSL10101000032.json';
    this.service.list(url,{}).then(data=>{
      loader.dismiss();
      if(data['data']){
          this.data = data['data'].T_PUR_Receiveentry.records;
      }
    });
  }
  logForm(){
    alert(JSON.stringify(this.data));
  }
  dblList(item){
    let modal = this.modalCtrl.create(ListDetailInputPage, item);
    modal.onDidDismiss(data => {
      console.log("Result: " + JSON.stringify(data) + JSON.stringify(item));
      if(data){
        item["QUANTITY"] = data["num"];
      }

    });
    modal.present();
  }
}
