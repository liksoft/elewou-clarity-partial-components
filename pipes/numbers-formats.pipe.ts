import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatAmount",
})
export class FormatAmountPipe implements PipeTransform {
  transform(value: any, locale: string = "fr-FR", currency?: string): any {
    if (value === undefined || value === null || value === "") {
      return "";
    }
    return Intl.NumberFormat(locale, { currency }).format(value);
  }
}

@Pipe({ name: "positiveNumber" })
export class PositiveNumber implements PipeTransform {
  transform(value?: any): number | undefined {
    if (undefined == value) {
      return value;
    }
    return Math.abs(value);
  }
}

@Pipe({ name: "parseInt" })
export class ParseInt implements PipeTransform {
  transform(value: string): number {
    return parseInt(value, 10);
  }
}
