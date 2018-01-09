import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ListDetailPage} from '../list-detail/list-detail';
import {HttpServiceProvider} from '../../providers/http-service/http-service';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  public  items = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:HttpServiceProvider) {
  }

  ionViewDidLoad() {
   this.loadDate();
    console.log('ionViewDidLoad ListPage');
  }
  itemSelected(item) {
   this.navCtrl.push(ListDetailPage, { item: item });
  }
  loadDate(){
    this.service.list('outbounds','').then(data=>{
      if(data.length>0){
        this.items = data;
      }

    });
  }
}
