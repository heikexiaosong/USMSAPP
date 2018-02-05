import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {WcodeSelectPage} from "../wcode-select/wcode-select";
import {BatchSelectPage} from "../batch-select/batch-select";


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

  private item = {};

  public num = 0;
  public name = "";
  public batch = "";
  public wcode = "";
  public wname = "";

  public FPRODUCEDATE = 0;
  public FEXPIRYDATE = 0;
  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
    console.log("ReceiptDetailInputPage: " + JSON.stringify(navParams));
    console.log("ReceiptDetailInputPage: " + JSON.stringify(navParams.get("item")));

    this.item = navParams.get("item");

    this.num =  this.item["QUANTITY"];
    this.name = this.item["FNAME"];
    this.batch = this.item["MGOODSBATCH"];
    this.wname = this.item["WNAME"];

    this.FPRODUCEDATE = this.item["FPRODUCEDATE"];
    this.FEXPIRYDATE = this.item["FEXPIRYDATE"];
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

  batchselect() {
      new Promise((resolve, reject) => {
        this.navCtrl.push(BatchSelectPage, { resolve: resolve, goodcode: this.item["FMATERIALID"] });
      }).then((data) => {
        this.item["MGOODSBATCH"] = data["fmasterid"];
        console.log(JSON.stringify(data["fmasterid"]));
      });
  }

  r_ok() {
    this.viewCtrl.dismiss({num: this.num,
      wcode: this.wcode, wname: this.wname,
      FPRODUCEDATE: new Date(this.FPRODUCEDATE).getTime(), FEXPIRYDATE: new Date(this.FEXPIRYDATE).getTime()});
  }
}
