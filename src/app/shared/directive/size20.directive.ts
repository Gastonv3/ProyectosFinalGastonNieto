import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSize20]',
})
export class Size20Directive {
  constructor(private elemento: ElementRef) {
    elemento.nativeElement.style.fontSize = '20px';
    elemento.nativeElement.style.marginTop = '12px';
  }
}
