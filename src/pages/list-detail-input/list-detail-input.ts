import {ChangeDetectorRef, Component, HostListener, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {WcodeSelectPage} from "../wcode-select/wcode-select";
import {AppConfig} from "../../app/app.config";
import {HttpServiceProvider} from "../../providers/http-service/http-service";

/**
 * Generated class for the ListDetailInputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export enum KEY_CODE {
  ENTER_KEY = 13
}

@IonicPage()
@Component({
  selector: 'page-list-detail-input',
  templateUrl: 'list-detail-input.html',
})
export class ListDetailInputPage {


  private parentCode: string = "";

  private packages = [];

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(JSON.stringify(event.key) + event.code);
    console.log("Code:" + this.parentCode + " <== " + event.keyCode);
    if ( event.keyCode == KEY_CODE.ENTER_KEY ){
      this.scanPackage(this.parentCode);
      this.parentCode = "";
    } else {
      this.parentCode = this.parentCode + event.key;
    }
  }

  scanPackage(parentCode) {
    console.log("Scan: " + parentCode);
    if ( parentCode.length == 0) {
      return;
    }



    if( parentCode.toLowerCase().indexOf("wx") != 0){
      return;
    }

    for(var i= 0; i< this.packages.length; i++){
      var packageCode = this.packages[i];
      if ( packageCode === parentCode ){
        let toast = this.toastCtrl.create({
          message: '此箱码已扫',
          duration: 1500
        });
        toast.present();
        return;
      }
    }


    const url = AppConfig.getProUrl() + "ws/packagings/" + parentCode;
    this.service.getObservable(url).subscribe(
      data => {
        var packaging = data.json()||{};
        console.log("箱码扫描: " + JSON.stringify(packaging));

        var goodsbatch = packaging["goodsbatch"];
        if ( goodsbatch==null ){
          let toast = this.toastCtrl.create({
            message: '此箱码为空箱',
            duration: 3000
          });
          toast.present();
        } else {
          var quantity = packaging["quantity"]||0;
          console.log("item: " + JSON.stringify(this.item));
          if ( goodsbatch === this.item["FLOTID"] ){
            var quantityStr = this.item["QUANTITY"]||"0";
            console.log("quantityStr: " + quantityStr);
            var bquantity = parseInt(quantityStr);
            this.item["QUANTITY"] = bquantity + quantity;
            this.packages.push(parentCode);
            console.log(JSON.stringify(this.packages))
          }
        }
        this.detectorRef.detectChanges();
      },
      err => console.error(err),
      () => {
        console.log('getRepos completed');
      }
    );
    this.parentCode = "";
  }

  public item = {};

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public service:HttpServiceProvider,
              public detectorRef: ChangeDetectorRef,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
    console.log("ReceiptDetailInputPage: " + JSON.stringify(navParams));
    console.log("ReceiptDetailInputPage: " + JSON.stringify(navParams.get("FNAME")));

    this.item = navParams.get("item");
    this.packages = this.item["packages"]||[];
    this.item["MGOODSBATCH"] = this.item["MGOODSBATCH"] || this.item["VERNUMBER"];
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptDetailInputPage');
  }

  wcodeselect() {
    new Promise((resolve, reject) => {
      this.navCtrl.push(WcodeSelectPage, { resolve: resolve});
    }).then((data) => {
      console.log(data);
      this.item["WCODE"] = data["FNUMBER"];
      this.item["WNAME"] = data["FNAME"];
      this.item["WID"] = data["FSTOCKID"];
    });
  }

  r_ok() {
    this.item["packages"] = this.packages;
    this.viewCtrl.dismiss(this.item);
  }

}
