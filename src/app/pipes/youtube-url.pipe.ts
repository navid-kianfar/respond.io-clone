import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'youtubeUrl',
})
export class YoutubeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: any) {
    const parsed = new URL(url);
    url = parsed.origin + '/embed/' + parsed.searchParams.get('v');
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
