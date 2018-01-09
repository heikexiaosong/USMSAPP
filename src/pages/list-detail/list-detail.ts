import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpServiceProvider} from '../../providers/http-service/http-service';
import {ListDetailInputPage} from '../list-detail-input/list-detail-input';
import { ModalController } from 'ionic-angular';

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
              public modalCtrl: ModalController) {
    this.listDetial = this.navParams.data.item ;
    console.log(JSON.stringify(this.listDetial));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListDetailPage');
    this.loadDetail();
  }
  loadDetail(){
    this.service.list('/system/funcdef/detail/T_SAL_OUTSTOCK/' + this.listDetial["OUTSTOCK_FOREIGNKEY"],'').then(data=>{
      const record = this.master;
      data.data.master.forEach(
        function (eachObj) {
          record[eachObj["name"]] = eachObj;
        }
      );
      this.data = data.data.details.T_SAL_OUTSTOCKENTRY.records;
    });
  }
  logForm(){
    alert('1');
  }
  dblList(item){
    let modal = this.modalCtrl.create(ListDetailInputPage, item);
    modal.onDidDismiss(data => {
      console.log("Result: " + JSON.stringify(data));
      item["QUANTITY"] = data["num"]
    });
    modal.present();
  }
}
