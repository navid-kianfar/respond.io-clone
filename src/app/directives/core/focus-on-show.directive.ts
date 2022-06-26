import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[input-focus]',
})
export class FocusOnShowDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    (this.elementRef.nativeElement as HTMLInputElement).focus();
  }
}
