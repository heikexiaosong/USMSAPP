import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpServiceProvider} from "../../providers/http-service/http-service";
import {AppConfig} from "../../app/app.config";

/**
 * Generated class for the ExpressSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-express-select',
  templateUrl: 'express-select.html',
})
export class ExpressSelectPage {

  private keyword:string = "";

  public batchs  = [];

  public goodcode  = "";

  public showBatchs  = [];

  private resolve:any;

  private normals = [100009, 100008, 100010, 100007, 100012, 100003, 100022, 100011, 100068, 100015, 100033, 100034, 100028, 100031];

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
    this.service.postObservable(AppConfig.getProUrl() + "system/funcdef/LOGISTICSCOM/query", {}).subscribe(
      data => {
        var result = data.json().data.records || [] ;
        console.log("Batch: " + JSON.stringify(result));
        this.batchs = result;
        this.showBatchs = [];
        for ( var i = 0; i < this.batchs.length; i++ ) {
          for(var j = 0; j < this.normals.length; j++){
            if( this.batchs[i]["FID"] === this.normals[j]){
              this.showBatchs.push(this.batchs[ i ]);
              break;
            }
          }
        }
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
    if ( this.keyword==null || this.keyword.trim() === '' ) {
      for ( var i = 0; i < this.batchs.length; i++ ) {
        for(var j = 0; j < this.normals.length; j++){
          if( this.batchs[i]["FID"] === this.normals[j]){
            this.showBatchs.push(this.batchs[ i ]);
            break;
          }
        }
      }
    } else {
      for ( var i = 0; i < this.batchs.length; i++ ) {
        console.log(JSON.stringify(this.batchs[i]));
        var fmasterid = this.batchs[i]["FNAME"]||"";
        if( fmasterid.indexOf(this.keyword) > -1){
          this.showBatchs.push(this.batchs[ i ])
        }
      }
    }
  }

  customerSelected(batch) {
    this.resolve(batch); // 可在 resolve 中添加返回的数据，如 this.resolve(data);
    this.navCtrl.pop();
  }

}
