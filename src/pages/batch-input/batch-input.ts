import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BatchInputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-batch-input',
  templateUrl: 'batch-input.html',
})
export class BatchInputPage {

  public name = "";

  public batch = "";

  private item = {};

  private resolve:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

    console.log(navParams);
    this.resolve = navParams.get('resolve');

    this.item = navParams.get("item");
    this.name = this.item["FNAME"];

    this.batch = this.item["MGOODSBATCH"] || this.item["VERNUMBER"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BatchInputPage');
  }

  r_ok() {
    this.item["MGOODSBATCH"] = this.batch;
    this.resolve(this.item); // 可在 resolve 中添加返回的数据，如 this.resolve(data);
    this.navCtrl.pop();
  }
}
