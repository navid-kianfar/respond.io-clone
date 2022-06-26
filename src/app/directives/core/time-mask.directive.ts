import { Directive, ElementRef, OnDestroy } from '@angular/core';
// @ts-ignore
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';

@Directive({
  selector: '[appTimeMask]',
})
export class TimeMaskDirective implements OnDestroy {
  mask = [/\d/, /\d/, ':', /\d/, /\d/]; // hh:mm
  maskedInputController;

  constructor(private element: ElementRef) {
    this.maskedInputController = textMask.maskInput({
      inputElement: this.element.nativeElement,
      mask: this.mask,
    });
  }

  ngOnDestroy() {
    this.maskedInputController.destroy();
  }
}
