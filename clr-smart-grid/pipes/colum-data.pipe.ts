import { Pipe, PipeTransform } from '@angular/core';
import {
  UpperCasePipe,
  LowerCasePipe,
  CurrencyPipe,
  DecimalPipe,
  JsonPipe,
  PercentPipe,
  SlicePipe,
  AsyncPipe,
} from '@angular/common';
import { after, before } from '@iazlabs/strings';
import {
  ParseDatePipe,
  ParseMonthPipe,
  DateTimePipe,
  MaskedContentPipe,
  SafeWebContentPipe,
  SafeRessourceContentPipe,
  TimeAgoPipe,
} from '../../pipes';

@Pipe({
  name: 'data',
})
export class ColumnDataPipe implements PipeTransform {
  constructor(
    private datePipe: ParseDatePipe,
    private monthPipe: ParseMonthPipe,
    private dateTimpePipe: DateTimePipe,
    private maskedPipe: MaskedContentPipe,
    private webContentPipe: SafeWebContentPipe,
    private webResourcePipe: SafeRessourceContentPipe,
    private timeAgoPipe: TimeAgoPipe,
    private uppercasePipe: UpperCasePipe,
    private lowerCasePipe: LowerCasePipe,
    private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe,
    private jsonPipe: JsonPipe,
    private percentPipe: PercentPipe,
    private slicePipe: SlicePipe,
    private asyncPipe: AsyncPipe
  ) {}

  transform(
    value: any,
    transform: string | ((value: unknown) => unknown) | undefined
  ) {
    if (typeof transform === 'function') {
      return transform(value);
    }
    if (typeof transform === 'undefined' || transform === null) {
      return value;
    }
    const hasParams = transform.includes(':');
    const pipe = hasParams ? before(':', transform) : transform;
    const params = hasParams
      ? after(':', transform)
          ?.split(',')
          ?.map((x) => x.trim()) ?? []
      : [];
    switch (pipe) {
      case 'date':
        return this.datePipe.transform(value, ...params);
      case 'datetime':
        return this.dateTimpePipe.transform(value, ...params);
      case 'timeago':
        return this.timeAgoPipe.transform(value, ...params);
      case 'month':
        return this.monthPipe.transform(value);
      case 'masked':
        return this.maskedPipe.transform(
          value,
          ...params.map((x) => Number(x))
        );
      case 'safecontent':
        return this.webContentPipe.transform(value);
      case 'saferesource':
        return this.webResourcePipe.transform(value);
      case 'uppercase':
        return this.uppercasePipe.transform(value);
      case 'lowercase':
        return this.lowerCasePipe.transform(value); //
      case 'currency':
        return this.currencyPipe.transform(value); //
      case 'decimal':
        return this.decimalPipe.transform(value, ...params);
      case 'json':
        return this.jsonPipe.transform(value);
      case 'percent':
        return this.percentPipe.transform(value, ...params);
      case 'slice':
        return this.slicePipe.transform(
          value,
          +params[0],
          +params[1] ?? undefined
        );
      case 'async':
        return this.asyncPipe.transform(value);
      default:
        return value;
    }
  }
}
