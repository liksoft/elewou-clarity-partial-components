import { Pipe, PipeTransform } from "@angular/core";
import { numberToAmountFormat } from "src/app/lib/core/utils";

@Pipe({
  name: "formatAmount",
})
export class FormatAmountPipe implements PipeTransform {
  transform(
    value: any,
    decimal: any | number = 0,
    separator: string = " "
  ): any {
    return numberToAmountFormat(value, decimal, separator);
  }
}

@Pipe({
  name: "amountFormatter",
})
export class AmountFormaterPipe implements PipeTransform {
  transform(
    value: any,
    decimal: any | number = 0,
    separator: string = " "
  ): any {
    return numberToAmountFormat(value, decimal, separator);
  }
}

@Pipe({ name: "positiveNumber" })
export class PositiveNumber implements PipeTransform {
  transform(value: number): number {
    return Math.abs(value);
  }
}

@Pipe({ name: "parseInt" })
export class ParseInt implements PipeTransform {
  transform(value: string): number {
    return parseInt(value, 10);
  }
}
