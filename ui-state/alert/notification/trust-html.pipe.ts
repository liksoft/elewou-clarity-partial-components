import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'trustHtml'
})
export class TrusteHTMLPipe implements PipeTransform {

  // Creates {@see TrusteHTMLPipe} instance
  constructor(private sanitized: DomSanitizer) {
  }
  transform(value: string) {
      return this.sanitized.bypassSecurityTrustHtml(value);
  }

}
