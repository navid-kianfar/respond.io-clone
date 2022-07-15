import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FileService} from "../../services/core/file.service";

@Directive({
  selector: '[appThumbnailPreview]',
})
export class ThumbnailPreviewDirective implements OnInit, OnChanges {
  @Input('appThumbnailPreview') file: File | string | any;

  constructor(
    readonly element: ElementRef,
    readonly fileService: FileService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes["file"]) {
      this.refresh(changes["file"].currentValue);
    }
  }

  ngOnInit() {
    if (this.fileService.isImage(this.file)) {
      if (this.file instanceof File) {
        this.fileService.blob(this.element.nativeElement, this.file);
      } else {
        this.element.nativeElement.src = this.file;
      }
      return;
    }

    const fileIcon = this.fileService.icon(this.file);
    this.element.nativeElement.src = fileIcon || this.file;
  }

  refresh(file: File | string) {
    if (!file) {
      this.element.nativeElement.src = undefined;
      return;
    }
    if (this.fileService.isImage(file)) {
      if (file instanceof File) {
        this.fileService.blob(this.element.nativeElement, file);
      } else {
        this.element.nativeElement.src = file;
      }
      return;
    }

    const fileIcon = this.fileService.icon(file);
    this.element.nativeElement.src = fileIcon || file;
  }
}
