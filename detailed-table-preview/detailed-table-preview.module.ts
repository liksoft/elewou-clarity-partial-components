import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { DetailedTablePreviewComponent } from "./detailed-table-preview.component";
import { PipesModule } from "../pipes";

@NgModule({
  imports: [CommonModule, TranslateModule, PipesModule],
  declarations: [DetailedTablePreviewComponent],
  exports: [DetailedTablePreviewComponent],
})
export class DetailedTablePreviewModule {}
