import {ChangeDetectorRef, Component, HostListener} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpServiceProvider} from '../../providers/http-service/http-service';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {ReceiptDetailInputPage} from '../receipt-detail-input/receipt-detail-input';
import {AppConfig} from "../../app/app.config";
import {BatchSelectPage} from "../batch-select/batch-select";
import {ExpressSelectPage} from "../express-select/express-select";
import {ExpressorderPage} from "../expressorder/expressorder";


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
  selector: 'page-receipt-detail',
  templateUrl: 'receipt-detail.html',
})
export class ReceiptDetailPage {

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

  public  listDetial= {};
  public master = {};
  public  data=[];
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public navParams: NavParams,
              public service:HttpServiceProvider,
              public modalCtrl: ModalController,
              public detectorRef: ChangeDetectorRef,
              public loadingCtrl: LoadingController) {
    this.listDetial = this.navParams.data.item ;
    console.log(JSON.stringify(this.listDetial));
  }

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

  scanPackage(parentCode) {
    console.log("Scan: " + parentCode);
    if ( parentCode.length == 0) {
      return;
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
          for(var i= 0;i<this.data.length;i++){
            var item = this.data[i];
            console.log("item: " + JSON.stringify(item));
            if ( goodsbatch === item["FLOTID"] ){
              var quantityStr = item["QUANTITY"]||"0";
              console.log("quantityStr: " + quantityStr);
              var bquantity = parseInt(quantityStr);
              item["QUANTITY"] = bquantity + quantity;
              this.packages.push(parentCode);
              console.log(JSON.stringify(this.packages))
            }
            this.data[i] = item;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListDetailPage');
    this.loadDetail();
  }
  loadDetail(){
    let loader = this.loadingCtrl.create({
      content: "加载中..."
    });
    loader.present();
    const url='system/funcdef/details/T_SAL_DELIVERYNOTICE/' + this.listDetial["FBILLNO"];
    //const url ='CGSL10101000033.json';
    this.service.list(url,{}).then(data=>{
      loader.dismiss();
      if(data['data']){
        this.data = data['data'].t_Sal_Deliverynoticeentry.records||[];
        for(var i= 0; i<this.data.length; i++){
          var item = this.data[i];
          console.log("item: " + JSON.stringify(item));
          item["MGOODSBATCH"] = item["MGOODSBATCH"] || item["FNUMBER"] || "";
          let sdate =  item["FPRODUCEDATE"] || item["SDATE"] || 0;
          let edate =  item["FEXPIRYDATE"] || item["EDATE"] || 0;
          if ( sdate > 0 ){
            item["FPRODUCEDATE"] = this.dateFtt("yyyy-MM-dd", sdate);
          }
          if ( edate > 0 ){
            item["FEXPIRYDATE"] = this.dateFtt("yyyy-MM-dd", edate);
          }
        }
      }
    });
  }
  logForm(){
    let detail = [];
    for(var i= 0; i<this.data.length; i++){
      debugger;
      var item = Object.assign({}, this.data[i]);
      item["MGOODSBATCH"] = item["MGOODSBATCH"] || item["FNUMBER"] || "";
      item["FPRODUCEDATE"] = item["SDATE"] || item["FPRODUCEDATE"] || 0;
      item["FEXPIRYDATE"] = item["EDATE"] || item["FEXPIRYDATE"] || 0;
      console.log("item: " + JSON.stringify(item));
      detail.push(item);
    }

    var details = [{
      id: 'T_SAL_DELIVERYNOTICEENTRY',
      extend: 't_Sal_Deliverynoticeentry',
      records: detail
    }];

    this.listDetial["ZT"] = '提交';
    this.listDetial["flag"] = 'U';

    var data = {
      "master": this.listDetial,
      "details": details
    };

    let loader = this.loadingCtrl.create({
      content: "正在处理..."
    });
    loader.present();
    console.log(JSON.stringify(data));
    this.service.postObservable(AppConfig.getProUrl() + "system/funcdef/T_SAL_DELIVERYNOTICE/update", data).subscribe(
      data => {
        var result = data.json();
        console.log("来料提交Result: " + JSON.stringify(result));
        if (result && !result.success) {//由于和后台约定好,所有请求均返回一个包含success,msg,data三个属性的对象,所以这里可以这样处理
          let toast = this.toastCtrl.create({
            message: result.msg,
            duration: 3000
          });
          toast.present();
        } else {
          this.service.postObservable(AppConfig.getProUrl() + "ws/qrcodes/binding/" + this.listDetial["FBILLNO"], {datas: this.packages}).subscribe(
            data => {
              console.log("Binding Result: " + JSON.stringify(data.json()));
              alert("提交成功!");
              this.navCtrl.pop();
            },
            err => console.error(err),
            () => {
              console.log('getRepos completed');
            }
          );
        }
      },
      err => console.error(err),
      () => {
        loader.dismiss();
        console.log('getRepos completed');
      }
    );
  }

  express(master){
    new Promise((resolve, reject) => {
      this.navCtrl.push(ExpressSelectPage, { resolve: resolve, master: master});
    }).then((data) => {
      this.listDetial["EXPRESSCODE"] = data["FCODE"];
      this.listDetial["EXPRESS"] = data["FNAME"];
      console.log(JSON.stringify(data["fmasterid"]));
    });
  }

  expressOrder(master){

    let modal = this.modalCtrl.create(ExpressorderPage, master);
    modal.onDidDismiss(data => {
      console.log("Result: " + JSON.stringify(data));
      if(data){
        this.listDetial["EXPRESSOID"] = data["EXPRESSOID"];
      }
    });
    modal.present();
  }

  dblList(item){
    let modal = this.modalCtrl.create(ReceiptDetailInputPage, {item: item});
    modal.onDidDismiss(data => {
      console.log("Result: " + JSON.stringify(data));
      if(data){
        item["QUANTITY"] = data["num"];
        item["WCODE"] = data["wcode"];
        item["WNAME"] = data["wname"];
        if ( data["FPRODUCEDATE"] !=null &&  data["FPRODUCEDATE"] > 0  ){
          item["FPRODUCEDATE"] = this.dateFtt("yyyy-MM-dd",  data["FPRODUCEDATE"]);
        }
        if (  data["FEXPIRYDATE"] !=null && data["FEXPIRYDATE"] > 0 ){
          item["FEXPIRYDATE"] = this.dateFtt("yyyy-MM-dd", data["FEXPIRYDATE"]);
        }
      }
    });
    modal.present();

  }

}
