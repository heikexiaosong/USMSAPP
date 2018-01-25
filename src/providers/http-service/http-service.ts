//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {AppConfig} from "../../app/app.config";

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {

  private  rootUrl:string;

  constructor(private http: Http,
              public toastCtrl: ToastController) {
    this.rootUrl = AppConfig.getProUrl();
  }

  public get(url: string, paramObj: any) {
    return this.http.get(url + this.toQueryString(paramObj))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }

  public postObservable(url: string, paramObj: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, paramObj||{}, new RequestOptions({headers: headers}));
  }

  public getObservable(url: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get(url, new RequestOptions({headers: headers}));
  }

  public post(url: string, paramObj: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, paramObj||{}, new RequestOptions({headers: headers}))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }

  public postBody(url: string, paramObj: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, paramObj, new RequestOptions({headers: headers}))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }

  private handleSuccess(result) {
    if (result && !result.success) {//由于和后台约定好,所有请求均返回一个包含success,msg,data三个属性的对象,所以这里可以这样处理
      let toast = this.toastCtrl.create({
        message: result.msg,
        duration: 3000
      });
      toast.present();
    }
    return result;
  }

  private handleError(error: Response | any) {
    let msg = '请求失败';
    if (error.status == 0) {
      msg = '请求地址错误';
    }
    if (error.status == 400) {
      msg = '请求无效';
      console.log('请检查参数类型是否匹配');
    }
    if (error.status == 404) {
      msg = '请求资源不存在';
      console.error(msg+'，请检查路径是否正确');
    }
    console.log(error);
   // alert(msg);//这里使用ToastController
    return {success: false, msg: msg};
  }

  /**
   * @param obj　参数对象
   * @return {string}　参数字符串
   * @example
   *  声明: var obj= {'name':'小军',age:23};
   *  调用: toQueryString(obj);
   *  返回: "?name=%E5%B0%8F%E5%86%9B&age=23"
   */
  private toQueryString(obj) {
    let ret = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {//数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return '?' + ret.join('&');
  }

  /**
   *
   * @param obj
   * @return {string}
   *  声明: var obj= {'name':'小军',age:23};
   *  调用: toQueryString(obj);
   *  返回: "name=%E5%B0%8F%E5%86%9B&age=23"
   */
  private toBodyString(obj) {
    let ret = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {//数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return ret.join('&');
  }

  private toQueryPair(key, value) {
    if (typeof value == 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }

  //请求list数据
  list(url,params){
    return this.post(this.rootUrl+url ,params);
  }
}
