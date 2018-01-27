import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpressorderPage } from './expressorder';

@NgModule({
  declarations: [
    ExpressorderPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpressorderPage),
  ],
})
export class ExpressorderPageModule {}
