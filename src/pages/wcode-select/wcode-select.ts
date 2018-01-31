import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AppConfig} from "../../app/app.config";
import {HttpServiceProvider} from "../../providers/http-service/http-service";

/**
 * Generated class for the WcodeSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wcode-select',
  templateUrl: 'wcode-select.html',
})
export class WcodeSelectPage {

  private keyword:string = "";

  public batchs  = [];

  public wname  = "";

  public showBatchs  = [];

  private resolve:any;

  constructor(public navCtrl: NavController,
              public service:HttpServiceProvider,
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
    this.resolve = navParams.get('resolve');
    console.log(JSON.stringify(this.resolve));
    this.batchs = [];
  }

  ionViewDidLoad() {
    this.batchs = [];
    console.log('ionViewDidLoad CustomerSelectPage');

    let loader = this.loadingCtrl.create({
      content: "加载中..."
    });
    loader.present();
    this.service.postObservable(AppConfig.getProUrl() + "system/funcdef/3/query", {}).subscribe(
      data => {
        var result = data.json().data.records || [] ;
        console.log("Batch: " + JSON.stringify(result));
        this.batchs = result;
        this.showBatchs = this.batchs;
      },
      err => console.error(err),
      () => {
        loader.dismiss();
        console.log('getRepos completed');
      }
    );

  }


  searchCustomer(event){
    this.showBatchs = [];
    for ( var i = 0; i < this.batchs.length; i++ ) {
      console.log(JSON.stringify(this.batchs[i]));
      if( (this.batchs[i]["FNAME"]||"").indexOf(this.keyword) > -1 || (this.batchs[i]["FNUMBER"]||"").indexOf(this.keyword) > -1){
        this.showBatchs.push(this.batchs[ i ])
      }
    }
  }

  customerSelected(batch) {
    this.resolve(batch); // 可在 resolve 中添加返回的数据，如 this.resolve(data);
    this.navCtrl.pop();
  }

}
