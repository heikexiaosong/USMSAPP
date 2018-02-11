import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AppConfig} from "../../app/app.config";
import {HttpServiceProvider} from "../../providers/http-service/http-service";

/**
 * Generated class for the OrgselectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orgselect',
  templateUrl: 'orgselect.html',
})
export class OrgselectPage {

  private keyword:string = "";

  public batchs  = [];

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
    console.log('ionViewDidLoad OrgselectPage');

    let loader = this.loadingCtrl.create({
      content: "加载中..."
    });
    loader.present();
    this.service.postObservable(AppConfig.getProUrl() + "system/funcdef/t_stk_inventory/query", {}).subscribe(
      data => {
        var result = data.json().data.records || [] ;
        console.log("Batch: " + JSON.stringify(result));

        let set = {};
        for ( var i = 0; i < result.length; i++ ) {
          console.log(JSON.stringify(result[i]));
          if (set[result[i]["MASTERCODE"]] !=null ){
            continue;
          }
          this.batchs.push(result[ i ]);
          set[result[i]["MASTERCODE"]] = result[ i ];
        }
        this.showBatchs = this.batchs;
      },
      err => console.error(err),
      () => {
        loader.dismiss();
        console.log('getRepos completed');
      }
    );

  }


  searchOrg(event){
    this.showBatchs = [];
    for ( var i = 0; i < this.batchs.length; i++ ) {
      console.log(JSON.stringify(this.batchs[i]));
      if( (this.batchs[i]["MASTERCODE"]||"").indexOf(this.keyword) > -1 || (this.batchs[i]["MASTER"]||"").indexOf(this.keyword) > -1){
        this.showBatchs.push(this.batchs[ i ]);
      }
    }
  }

  orgSelected(batch) {
    this.resolve(batch); // 可在 resolve 中添加返回的数据，如 this.resolve(data);
    this.navCtrl.pop();
  }


}
