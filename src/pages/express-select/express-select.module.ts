import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpressSelectPage } from './express-select';

@NgModule({
  declarations: [
    ExpressSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpressSelectPage),
  ],
})
export class ExpressSelectPageModule {}
