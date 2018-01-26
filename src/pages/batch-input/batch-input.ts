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

  private resolve:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

    this.resolve = navParams.get('resolve');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BatchInputPage');
  }

  r_ok(batch) {
    this.resolve(batch); // 可在 resolve 中添加返回的数据，如 this.resolve(data);
    this.navCtrl.pop();
  }
}
