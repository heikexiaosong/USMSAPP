import {Component, ViewChild} from '@angular/core';
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

  @ViewChild('focusInput') focusInput ;

  public num = 0;
  public name = "";
  public batch = "";
  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
    console.log("ReceiptDetailInputPage: " + JSON.stringify(navParams));
    console.log("ReceiptDetailInputPage: " + JSON.stringify(navParams.get("FNAME")));

    this.num = navParams.get("FACTRECEIVEQTY");
    this.name = navParams.get("FNAME");
    this.batch = navParams.get("MGOODSBATCH");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptDetailInputPage');


    setTimeout(() => {
      this.focusInput.setFocus();
    },150); //a least 150ms.
  }

  r_ok() {
    this.viewCtrl.dismiss({num: this.num});
  }

}
