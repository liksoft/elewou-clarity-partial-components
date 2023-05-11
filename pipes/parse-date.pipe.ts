import { Pipe, PipeTransform } from "@angular/core";
import { GetTimeAgo, JSDate, ParseMonth } from "@azlabsjs/js-datetime";

@Pipe({
  name: "parseDate",
})
export class ParseDatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (JSDate.isDate(new Date(value))) {
      return JSDate.format(value, args ? args : "lll");
    }
    return "";
  }
}

@Pipe({
  name: "dateTime",
})
export class DateTimePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return typeof value === "undefined" || value === null
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
  // Transformation logic of the pipe object
  transform(value: any, locale: string = "fr-FR"): string {
    return typeof value === "undefined" || value === null
      ? ""
      : JSDate.isDate(value)
        ? GetTimeAgo()(JSDate.create(value), locale ?? "fr-FR")
        : value;
  }
}

@Pipe({
  name: "parseMonth",
})
export class ParseMonthPipe implements PipeTransform {
  transform(value: any): any {
    return typeof value === "undefined" || value === null
      ? ""
      : ParseMonth(value);
  }
}
