import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyFormatDirective } from './currency-Formt.directive';
// import { CurrencyPipe } from './format-currency.pipe';



@NgModule({
  declarations: [CurrencyFormatDirective],
  imports: [
    CommonModule
  ],
  exports:[
    CurrencyFormatDirective,
  ]
})
export class UtilsModule { }
