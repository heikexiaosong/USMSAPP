import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListDetailInputPage } from './list-detail-input';

@NgModule({
  declarations: [
    ListDetailInputPage,
  ],
  imports: [
    IonicPageModule.forChild(ListDetailInputPage),
  ],
})
export class ListDetailInputPageModule {}
