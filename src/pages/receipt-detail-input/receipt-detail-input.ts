import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpServiceProvider} from '../../providers/http-service/http-service';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


/**
 * Generated class for the ReceiptDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receipt-detail-input',
  templateUrl: 'receipt-detail-input.html',
})
export class ReceiptDetailInputPage {
  private num = 0;
  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
    console.log(JSON.stringify(navParams));
    console.log(navParams.get("QUANTITY"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptDetailInputPage');
  }

  r_ok() {
    this.viewCtrl.dismiss({num: this.num});
  }
}
