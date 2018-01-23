import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  public  data = {};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public service:HttpServiceProvider,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController) {
    this.data = this.navParams.data.item ;
    console.log(JSON.stringify(this.data));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptDetailInputPage');
  }
}
