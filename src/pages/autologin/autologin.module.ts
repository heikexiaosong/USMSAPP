import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutologinPage } from './autologin';

@NgModule({
  declarations: [
    AutologinPage,
  ],
  imports: [
    IonicPageModule.forChild(AutologinPage),
  ],
})
export class AutologinPageModule {}
