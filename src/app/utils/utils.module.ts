import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyMaskDirective } from './currency-mask.directive';



@NgModule({
  declarations: [CurrencyMaskDirective],
  imports: [
    CommonModule
  ],
  exports:[
    CurrencyMaskDirective
  ]
})
export class UtilsModule { }
