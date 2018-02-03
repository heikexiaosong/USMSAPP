import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {WcodeSelectPage} from "../wcode-select/wcode-select";

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

  public item = {};

  public num = 0;
  public name = "";
  public code = "";
  public batch = "";
  public wcode = "";
  public wname = "";
  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
    console.log("ReceiptDetailInputPage: " + JSON.stringify(navParams));
    console.log("ReceiptDetailInputPage: " + JSON.stringify(navParams.get("FNAME")));

    this.item = navParams.get("item");
    this.num = this.item["QUANTITY"];
    this.batch = this.item["MGOODSBATCH"];
    this.wname = this.item["WNAME"];
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptDetailInputPage');
  }

  wcodeselect() {
    new Promise((resolve, reject) => {
      this.navCtrl.push(WcodeSelectPage, { resolve: resolve});
    }).then((data) => {
      console.log(data);
      this.wcode = data["FNUMBER"];
      this.wname = data["FNAME"];
      //item["MGOODSBATCH"] = data["MGOODSBATCH"];
      //console.log(JSON.stringify(data["MGOODSBATCH"]));
    });
  }

  r_ok() {
    this.viewCtrl.dismiss({num: this.num, wcode: this.wcode, wname: this.wname});
  }

}
