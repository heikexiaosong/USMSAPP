import {Component, ViewChild, Input} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the ExpressorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expressorder',
  templateUrl: 'expressorder.html',
})
export class ExpressorderPage {

  private EXPRESSOID = "";


  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
    this.EXPRESSOID = navParams.get("EXPRESSOID");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpressorderPage');
  }

  r_ok() {
    this.viewCtrl.dismiss({EXPRESSOID: this.EXPRESSOID});
  }

}
