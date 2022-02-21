import { Component, Input } from '@angular/core';
import { getJSObjectPropertyValue } from 'src/app/lib/core/utils';

@Component({
  selector: 'app-detailed-table-preview',
  templateUrl: './detailed-table-preview.component.html',
  styles: [`
    th.header {
      font-weight: bold;
      height: 2rem;
      color: var(--clr-card-title-color, black);
    }
    .table tbody th, .table tbody td {
      padding: .55rem .6rem .55rem;
    }
  `
  ]
})
export class DetailedTablePreviewComponent {

  mappings: string[] = [];
  private _headers!: { [prop: string]: string };
  @Input() set headers(value: { [prop: string]: string }) {
    this.mappings  =  Object.keys(value);
    this._headers = value;
  }
  get headers() {
    return this._headers;
  }
  @Input() value!: { [prop: string]: any };

  @Input() datefields: string[]  =  [];

  @Input() currencyfields: string[] = [];

  @Input() hiddenfields: string[] = [];

  constructor() { }

  getvalue(value: { [prop: string]: any }, prop: string) {
    return getJSObjectPropertyValue(value, prop);
  }

}
