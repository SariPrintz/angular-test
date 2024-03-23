import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
  standalone: true
})
export class SafeUrlPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {}
  transform(url: string): string |null {
    if (!url) {
      return null;  
    }
    try {
      (this.domSanitizer.bypassSecurityTrustUrl(url));
      return url;
    } catch (error) {
      return null;
    }
  }

}
