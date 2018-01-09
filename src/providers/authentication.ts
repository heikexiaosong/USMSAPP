import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class AuthenticationProvider {

  private  rootUrl:string;

  private auth_token:string = '';

  constructor(private http: Http) {
    this.rootUrl = "http://118.31.239.85:8080/usms";
  }

  public login(username, password) {
    return this.http.post(this.rootUrl + `/login`, {userid:username, password:password, servername:"1"})
  }

  public  isAuth() {
    return false;
  }

}
