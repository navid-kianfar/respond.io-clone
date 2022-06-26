import {Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[gridCellDef]'
})
export class GridCellDefDirective {

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) { }

  @Input()
  set gridCellDef(element: any) {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}
