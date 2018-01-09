import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpServiceProvider} from '../../providers/http-service/http-service';

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
  public masters = [];
  public  data=[];
  public todo ={};
  constructor(public navCtrl: NavController, public navParams: NavParams, public service:HttpServiceProvider) {
    this.listDetial = this.navParams.data.item ;
    console.log(JSON.stringify(this.listDetial))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListDetailPage');
    this.loadDetail();
  }
  loadDetail(){
    this.service.list('/system/funcdef/detail/T_SAL_OUTSTOCK/' + this.listDetial["OUTSTOCK_FOREIGNKEY"],'').then(data=>{
      console.log(JSON.stringify(data));
      this.masters = data.data.master;
      this.data = data.data.details.T_SAL_OUTSTOCKENTRY.records;
    });
  }
  logForm(){
    debugger;
    alert('1');
  }
}
