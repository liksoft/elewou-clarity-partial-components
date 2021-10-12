import { Component, Output, EventEmitter, Input } from "@angular/core";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "drewlabs-datgrid-header",
  templateUrl: "./datgrid-header.component.html",
  styles: [],
})
export class DatgridHeaderComponent {
  // Component outputs properties
  @Output() createEvent = new EventEmitter<
    { [index: string]: any } | number | string
  >();
  @Output() refreshEvent = new EventEmitter<
    { [index: string]: any } | number | string
  >();
  @Output() exportToExcelEvent = new EventEmitter<
    { [index: string]: any } | number | string
  >();
  @Output() assigned = new EventEmitter<
    { [index: string]: any } | number | string
  >();

  // Component input properties
  @Input() createButtonDisabled = false;
  @Input() refreshButtonDisabled = false;
  @Input() excelDropDownDisabled = false;
  @Input() showExportDropdown = false;
  @Input() buttonClass = "btn btn-sm btn-secondary";
}
