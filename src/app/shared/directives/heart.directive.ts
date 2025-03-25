import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[heart]'
})
export class HeartDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.color = '#e35e6b'
  }
}
