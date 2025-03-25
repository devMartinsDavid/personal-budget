import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeartDirective } from './directives/heart.directive';

@NgModule({
  declarations: [HeartDirective],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    HeartDirective,  // Export directives for use in other modules
  ],
})
export class SharedModule {}
