import {ChangeDetectorRef, Component, HostListener} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpServiceProvider} from '../../providers/http-service/http-service';
import {ListDetailInputPage} from '../list-detail-input/list-detail-input';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {AppConfig} from "../../app/app.config";
import { ToastController } from 'ionic-angular';
import {BatchInputPage} from "../batch-input/batch-input";
import {ExpressSelectPage} from "../express-select/express-select";
import {ExpressorderPage} from "../expressorder/expressorder";

/**
 * Generated class for the ListDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export enum KEY_CODE {
  ENTER_KEY = 13
}

@IonicPage()
@Component({
  selector: 'page-list-detail',
  templateUrl: 'list-detail.html',
})
export class ListDetailPage {

  private parentCode: string = "";

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

  public  listDetial= [];
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

        var goodsbatchcode = packaging["goodsbatchcode"];
        if ( goodsbatchcode==null || goodsbatchcode==='' ){
          let toast = this.toastCtrl.create({
            message: '此箱码为空箱',
            duration: 3000
          });
          toast.present();
        } else {
          var quantity = packaging["quantity"]||0;
          for(var i= 0;i<this.data.length;i++){
            var item = this.data[i];
            if ( goodsbatchcode === item["FNUMBER"] ){
              var quantityStr = item["QUANTITY"]||"0";
              console.log("quantityStr: " + quantityStr);
              var bquantity = parseInt(quantityStr);
              item["QUANTITY"] = bquantity + quantity;
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
    const url='system/funcdef/details/T_PUR_Receive/' + this.listDetial["FBILLNO"];
    //const url ='CGSL10101000032.json';
    this.service.list(url,{}).then(data=>{
      loader.dismiss();
      if(data['data']){
          this.data = data['data'].T_PUR_Receiveentry.records||[];
          for(var i= 0; i<this.data.length; i++){
            var item = this.data[i];
            console.log("item: " + JSON.stringify(item));
            item["MGOODSBATCH"] = item["MGOODSBATCH"] || item["VERID"] || "";
          }
      }
    });
  }
  logForm(){
    var details = [{
      id: 'T_PUR_RECEIVEENTRY',
      extend: 'T_PUR_Receiveentry',
      records: this.data
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
    this.service.postObservable(AppConfig.getProUrl() + "system/funcdef/T_PUR_Receive/update", data).subscribe(
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
          alert("提交成功!");
          this.navCtrl.pop();
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


    if ( item["MGOODSBATCH"] ){
      let modal = this.modalCtrl.create(ListDetailInputPage, item);
      modal.onDidDismiss(data => {
        console.log("Result: " + JSON.stringify(data) + JSON.stringify(item));
        if(data){
          item["QUANTITY"] = data["num"];
        }
      });
      modal.present();
    } else {
      new Promise((resolve, reject) => {
        this.navCtrl.push(BatchInputPage, { resolve: resolve, goodcode: item["FMATERIALID"] });
      }).then((data) => {
        item["MGOODSBATCH"] = data["fmasterid"];
        console.log(JSON.stringify(data["fmasterid"]));
      });
    }
  }
}
