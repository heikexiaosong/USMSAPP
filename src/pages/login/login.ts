import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthenticationProvider} from "../../providers/authentication";
import { Md5 } from 'ts-md5/dist/md5';
import {HomePage} from "../home/home";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private userName: string;
  private userPwd: string;

  constructor(
    private _nav: NavController,
    private authProvider: AuthenticationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

  public login() {

    // Validation
    if ( this.userName.trim()=='' || this.userPwd.trim()=='') {
      alert("用户名/密码不能为空");
      return;
    }

      //Take the values from  the form control
      var encodePWD = Md5.hashStr(  this.userName.trim().toLocaleLowerCase() + "USER" +  this.userPwd + "PASSWORD");
      this.authProvider.login(this.userName, encodePWD).subscribe( data => {
        console.log("Login: " +  JSON.stringify(data.json()));
        var result = data.json();
        if ( result.success ){
          localStorage.setItem("auth_token", data.json().data.auth_token);
          this._nav.setRoot(HomePage);
        }
      },
      err => console.error(err),
      () => { console.log('getRepos completed') }
    );
  }
}
