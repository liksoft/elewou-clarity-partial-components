import { Inject, Optional, Pipe, PipeTransform } from "@angular/core";
import { NAVIGATOR } from "src/app/lib/core/utils/ng/common";
import { isDefined, JSDate, MonthProvider, TimeAgo } from "../../../core/utils";

@Pipe({
  name: "parseDate",
})
export class ParseDatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return !isDefined(value)
      ? ""
      : JSDate.isDate(value)
      ? JSDate.format(value, args ? args : "DD/MM/YYYY")
      : value;
  }
}

@Pipe({
  name: "dateTime",
})
export class DateTimePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return !isDefined(value)
      ? ""
      : JSDate.isDate(value)
      ? JSDate.format(value, args ? args : "lll")
      : value;
  }
}

@Pipe({
  name: "timeago",
})
export class TimeAgoPipe implements PipeTransform {
  // Instance initializer
  constructor(@Inject(NAVIGATOR) @Optional() private navigator?: Navigator) {}

  transform(value: any, locale: string = "fr-FR"): string {
    return !isDefined(value)
      ? ""
      : JSDate.isDate(value)
      ? new TimeAgo().format(JSDate.create(value), locale ?? this.navigator?.language)
      : value;
  }
}

@Pipe({
  name: "parseMonth",
})
export class ParseMonthPipe implements PipeTransform {
  transform(value: any): any {
    return !isDefined(value) ? "" : MonthProvider.parseMonth(value);
  }
}
