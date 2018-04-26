import {ChangeDetectorRef, Component, HostListener} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ToastController} from 'ionic-angular';
import {WcodeSelectPage} from "../wcode-select/wcode-select";
import {BatchSelectPage} from "../batch-select/batch-select";
import {AppConfig} from "../../app/app.config";
import {HttpServiceProvider} from "../../providers/http-service/http-service";
import {OrgselectPage} from "../orgselect/orgselect";
import {PackagecodesPage} from "../packagecodes/packagecodes";


/**
 * Generated class for the ReceiptDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export enum KEY_CODE {
  ENTER_KEY = 13
}

@IonicPage()
@Component({
  selector: 'page-receipt-detail-input',
  templateUrl: 'receipt-detail-input.html',
})
export class ReceiptDetailInputPage {

  private parentCode: string = "";

  private packages = [];

  /**************************************时间格式化处理************************************/
  dateFtt(fmt, _date) { //author: meizz
    const date = new Date(_date);
    var o = {
      "M+" : date.getMonth()+1,                 //月份
      "d+" : date.getDate(),                    //日
      "h+" : date.getHours(),                   //小时
      "m+" : date.getMinutes(),                 //分
      "s+" : date.getSeconds(),                 //秒
      "q+" : Math.floor((date.getMonth()+3)/3), //季度
      "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
      fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
      if(new RegExp("("+ k +")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
  }

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
          //this.item["FLOTID"] == null ||
          if (  goodsbatch === this.item["FLOTID"] ){
            var quantityStr = this.item["QUANTITY"]||"0";
            console.log("quantityStr: " + quantityStr);
            var bquantity = parseInt(quantityStr);
            this.item["QUANTITY"] = bquantity + quantity;
            this.packages.push(parentCode);
            console.log(JSON.stringify(this.packages))
          } else {
            console.log("goodsbatch: " + goodsbatch);
            console.log("FLOTID: " + this.item["FLOTID"]);
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

  private item = {};

  private SDATE = 0;

  private EDATE = 0;

  private max = 9999999;

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public service:HttpServiceProvider,
              public detectorRef: ChangeDetectorRef,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
    console.log("ReceiptDetailInputPage: " + JSON.stringify(navParams));
    console.log("ReceiptDetailInputPage: " + JSON.stringify(navParams.get("item")));

    this.item = navParams.get("item");

    this.item["QUANTITY"] = this.item["QUANTITY"] || this.item["FQTY"];

    this.packages = this.item["packages"]||[];

    this.max = this.item["FBASEQTY"];

    this.SDATE = this.dateFtt("yyyy-MM-dd",  this.item["SDATE"]||0) ;
    this.EDATE = this.dateFtt("yyyy-MM-dd",  this.item["EDATE"]||0) ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptDetailInputPage');
  }

  orgselect() {
    new Promise((resolve, reject) => {
      this.navCtrl.push(OrgselectPage, { resolve: resolve});
    }).then((data) => {
      console.log(data);
      this.item["ORGNUMBER"] = data["MASTERCODE"];
      this.item["ORGNAME"] = data["MASTER"];
    });
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


  packageCode() {
    new Promise((resolve, reject) => {
      this.navCtrl.push(PackagecodesPage, { resolve: resolve, packages: this.packages});
    }).then((data) => {
      console.log(data);

    });
  }

  batchselect() {
      new Promise((resolve, reject) => {
        this.navCtrl.push(BatchSelectPage, { resolve: resolve, goodcode: this.item["FMATERIALID"], item: this.item });
      }).then((data) => {
        console.log("Batch: " + JSON.stringify(data));
        this.item["MGOODSBATCH"] = data["PH"] ;

        this.item["ORGNUMBER"] = data["OWNERCODE"];
        this.item["ORGNAME"] = data["OWNER"];

        this.item["WID"] = data["CCODE"];
        this.item["WCODE"] = data["CKID"];
        this.item["WNAME"] = data["CKNAME"];


        this.SDATE = this.dateFtt("yyyy-MM-dd", data["SDATE"] || this.SDATE ) ;
        this.EDATE = this.dateFtt("yyyy-MM-dd", data["EDATE"] || this.EDATE ) ;

        this.item["SDATE"] = data["SDATE"] || this.item["SDATE"];
        this.item["EDATE"] = data["EDATE"] || this.item["EDATE"];

        this.item["FBASEQTY"] = data["QTY"] || this.item["FBASEQTY"];

        this.max = this.item["FBASEQTY"];

        this.item["VERSION"] = data["BCODE"] || this.item["VERSION"];
        this.item["ORIGIN"] = data["CDCODE"] || this.item["ORIGIN"];
        this.item["MANUFACTURER"] = data["SCCJCODE"] || this.item["MANUFACTURER"];
        this.item["MANUFACTURERNAME"] = data["SCCJ"] || this.item["MANUFACTURERNAME"];
        this.item["GRADE"] = data["ZLDJCODE"] || this.item["GRADE"];

        console.log("Item: " + JSON.stringify(this.item));


      });

    /**
     * Batch: {"WCODE":"CP0001000004671","FNUMBER":"10106","CCODE":"CK019","DCODE":"Kg","PH":"20151001","CDCODE":"湖北",
     * "SCCJCODE":"01","ZLDJCODE":"01","CD":"湖北","SCCJ":"-","ZLDJ":"-","SDATE":1450281600000,"EDATE":2314195200000,
     * "QTY":61872,"OWNERCODE":"10102","OWNER":"药材资源运营中心"}
     receipt-detail-input.ts:170

     Item: {"FBILLNO":"FHTZD10102000049","FMATERIALID":320010,"MFNUMBER":"CP0001000004671","FNAME":"披麻草","FQTY":1157.5,
     "FID":113533,"FENTRYID":115100,"FSEQ":1,"FNOTE":" ","FLOTID":420151,"FNUMBER":"YC20150804","MGOODSBATCH":"20151001",
     "QUANTITY":"900","WID":"CK001","WCODE":341025,"WNAME":"农副产品库","UNIT":"千克","FPRODUCEDATE":"2017-10-01",
     "FEXPIRYDATE":"2020-09-30","FTAXPRICE":31.11,"FALLAMOUNT":36009.82,"SDATE":1514736000000,"EDATE":1546185600000,"
     ORGNUMBER":"10102","ORGNAME":"药材资源运营中心","FBASEQTY":61872,"ORIGIN":"湖北","MANUFACTURER":"01","
     MANUFACTURERNAME":"-","GRADE":"01"}
     */
  }

  r_ok() {
    console.log( this.item["QUANTITY"] + ": " + this.max);
    if ( this.item["QUANTITY"] > this.max ){
      this.toastCtrl.create({
        message: '实发数量不能超过即时库存数量',
        duration: 2000
      }).present();
    } else {
      this.item["packages"]  = this.packages;
      this.viewCtrl.dismiss(this.item);
    }
  }
}
