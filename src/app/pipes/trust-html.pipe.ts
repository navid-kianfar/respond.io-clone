import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'trustHtml',
})
export class TrustHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(data: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(data);
  }
}
