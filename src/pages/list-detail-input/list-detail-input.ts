import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the ListDetailInputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-detail-input',
  templateUrl: 'list-detail-input.html',
})
export class ListDetailInputPage {

  private num = 0;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
    console.log(JSON.stringify(navParams));
    console.log(navParams.get("QUANTITY"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListDetailInputPage');
  }

  r_ok() {
    this.viewCtrl.dismiss({num: this.num});
  }

}
