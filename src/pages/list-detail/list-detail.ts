import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpServiceProvider} from '../../providers/http-service/http-service';
import {ListDetailInputPage} from '../list-detail-input/list-detail-input';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {AppConfig} from "../../app/app.config";
import { ToastController } from 'ionic-angular';
import {ExpressSelectPage} from "../express-select/express-select";
import {ExpressorderPage} from "../expressorder/expressorder";
import {RemarkshowPage} from "../remarkshow/remarkshow";

/**
 * Generated class for the ListDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-detail',
  templateUrl: 'list-detail.html',
})
export class ListDetailPage {

  public  listDetial= [];
  public master = {};
  public  data=[];
  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              public toastCtrl: ToastController,
              public navParams: NavParams,
              public service:HttpServiceProvider,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController) {
    this.listDetial = this.navParams.data.item ;
    console.log(JSON.stringify(this.listDetial));
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
    this.service.list(url,{}).then(data=>{
      loader.dismiss();
      if(data['data']){
          this.data = data['data'].T_PUR_Receiveentry.records||[];
          for(var i= 0; i<this.data.length; i++){
            var item = this.data[i];
            console.log("item: " + JSON.stringify(item));
            item["MGOODSBATCH"] = item["MGOODSBATCH"] || item["VERNUMBER"] || "";
            item["WCODE"] = item["RCODE"] || item["WCODE"] || "";
            item["WNAME"] = item["RNAME"] || item["WNAME"] || "";
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
          let alert =this.alertController.create({ title:'信息提示', subTitle:'提交成功!', buttons: [{text:'确定',handler: data => {
            this.navCtrl.pop();
          }}]});
          alert.present();
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
      debugger;
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
    let modal = this.modalCtrl.create(ListDetailInputPage, {item: item});
    modal.onDidDismiss(data => {
      console.log("Result: " + JSON.stringify(data) + JSON.stringify(item));
      if(data){
        item["packages"] = data["packages"];
        item["QUANTITY"] = data["QUANTITY"];
        item["WCODE"] = data["WCODE"] || item["WCODE"];
        item["WNAME"] = data["WNAME"] || item["WNAME"];
      }
    });
    modal.present();
  }

  fnoteShow (){
    new Promise((resolve, reject) => {
      this.navCtrl.push(RemarkshowPage, { resolve: resolve, content: this.listDetial["FNOTE"]});
    }).then((data) => {
      console.log(data);
    });
  }
}
