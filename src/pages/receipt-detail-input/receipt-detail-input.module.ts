import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiptDetailInputPage } from './receipt-detail-input';

@NgModule({
  declarations: [
    ReceiptDetailInputPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiptDetailInputPage),
  ],
})
export class ReceiptDetailInputPageModule {}
