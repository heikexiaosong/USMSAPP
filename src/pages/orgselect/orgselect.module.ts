import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrgselectPage } from './orgselect';

@NgModule({
  declarations: [
    OrgselectPage,
  ],
  imports: [
    IonicPageModule.forChild(OrgselectPage),
  ],
})
export class OrgselectPageModule {}
