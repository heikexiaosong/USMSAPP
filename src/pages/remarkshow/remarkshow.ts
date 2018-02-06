import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RemarkshowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-remarkshow',
  templateUrl: 'remarkshow.html',
})
export class RemarkshowPage {

  public content = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams);
    this.content = this.navParams.get("content");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemarkshowPage');
  }

  r_ok(){
    this.navCtrl.pop();
  }

}
