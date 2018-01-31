import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WcodeSelectPage } from './wcode-select';

@NgModule({
  declarations: [
    WcodeSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(WcodeSelectPage),
  ],
})
export class WcodeSelectPageModule {}
