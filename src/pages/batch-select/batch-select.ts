import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpServiceProvider} from "../../providers/http-service/http-service";
import {AppConfig} from "../../app/app.config";

/**
 * Generated class for the BatchSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-batch-select',
  templateUrl: 'batch-select.html',
})
export class BatchSelectPage {

  private keyword:string = "";

  public batchs  = [];

  public goodcode  = "";
  public item  = {};

  public showBatchs  = [];

  private resolve:any;

  constructor(public navCtrl: NavController,
              public service:HttpServiceProvider,
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
    this.resolve = navParams.get('resolve');
    console.log(JSON.stringify(this.resolve));
    this.batchs = [];
    this.goodcode = navParams.get("goodcode")||"-1";
    this.item = navParams.get("item")||{};
  }

  ionViewDidLoad() {
    this.batchs = [];
    console.log('ionViewDidLoad CustomerSelectPage');


    let loader = this.loadingCtrl.create({
      content: "加载中..."
    });
    loader.present();
    this.service.postObservable(AppConfig.getProUrl() + "system/funcdef/stk_inventory/query", {"field":"WCODE","type":"String","op":"like","value": this.item["MFNUMBER"]}).subscribe(
      data => {
        var result = data.json() || [] ;
        console.log("Batch: " + JSON.stringify(result));
        this.batchs = result.data.records;
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
      var fmasterid = this.batchs[i]["PH"]||0;
      if( fmasterid.toString().indexOf(this.keyword) > -1){
        this.showBatchs.push(this.batchs[ i ])
      }
    }
  }

  customerSelected(batch) {
    this.resolve(batch); // 可在 resolve 中添加返回的数据，如 this.resolve(data);
    this.navCtrl.pop();
  }

}
