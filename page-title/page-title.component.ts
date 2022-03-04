import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styles: [
    `
      @import "../assets/mixins/typography";
      @import "../assets/mixins/colors";
    `
  ]
})
export class PageTitleComponent {
  @Input() title: string;
}
