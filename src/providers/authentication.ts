import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AppConfig} from "../app/app.config";

@Injectable()
export class AuthenticationProvider {

  private  rootUrl:string;

  constructor(private http: Http) {
    this.rootUrl = AppConfig.appUrl();
  }

  public login(username, password) {
    debugger;
    return this.http.post(AppConfig.appUrl() + `/login`, {userid:username, password:password, servername:"1"})
  }

  public  isAuth() {
    return false;
  }

}
