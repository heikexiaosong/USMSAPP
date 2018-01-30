import { Component } from '@angular/core';
import {LoadingController, NavController, ToastController} from 'ionic-angular';
import {AuthenticationProvider} from "../../providers/authentication";
import { Md5 } from 'ts-md5/dist/md5';
import {HomePage} from "../home/home";
import {AppConfig} from "../../app/app.config";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private userName: string;
  private userPwd: string;
  private url: string;

  constructor(
    private _nav: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private authProvider: AuthenticationProvider) {
    this.url = AppConfig.url;

    this.userName = 'ZHANGS';
    this.userPwd = '123456';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

  public login() {
    //this._nav.setRoot(HomePage);
    // Validation
    AppConfig.url = this.url;
    if ( this.url.trim()=='' ) {
      let toast = this.toastCtrl.create({
        message: '服务器地址不能为空',
        duration: 2000
      });
      toast.present();
      return;
    }

    if(this.userName){
      if ( this.userName.trim()=='' || this.userPwd.trim()=='') {
        let toast = this.toastCtrl.create({
          message: '用户名/密码不能为空',
          duration: 2000
        });
        toast.present();
        return;
      }
      //Take the values from  the form control
      var encodePWD = Md5.hashStr(  this.userName.trim().toLocaleLowerCase() + "USER" +  this.userPwd + "PASSWORD");

      let loader = this.loadingCtrl.create({
        content: "正在登陆..."
      });
      loader.present();
      this.authProvider.login(this.userName, encodePWD).subscribe( data => {
          console.log("Login: " +  JSON.stringify(data.json()));
          var result = data.json();
          if ( result.success ){
            localStorage.setItem("auth_token", data.json().data.auth_token);
            this._nav.setRoot(HomePage);
          } else {
            let toast = this.toastCtrl.create({
              message: result.message,
              duration: 3000
            });
            toast.present();
          }
        },
        err => console.error(err),
        () => {
          loader.dismiss();
          console.log('getRepos completed')
         }
      );
    }
  }
}
