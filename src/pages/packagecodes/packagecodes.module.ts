import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PackagecodesPage } from './packagecodes';

@NgModule({
  declarations: [
    PackagecodesPage,
  ],
  imports: [
    IonicPageModule.forChild(PackagecodesPage),
  ],
})
export class PackagecodesPageModule {}
