import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PackagecodesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-packagecodes',
  templateUrl: 'packagecodes.html',
})
export class PackagecodesPage {

  public packages = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.packages = navParams.get("packages")||[];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PackagecodesPage');
  }

  deleteItem(item){
    console.log(item);
    for(var i= 0; i< this.packages.length; i++){
      var packageCode = this.packages[i];
      if ( packageCode === item ){
        this.packages.splice(i, 1);
        return;
      }
    }
  }

}
