import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  Inject,
} from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { ModulesProvider } from "./core/v2/providers/module";
import { getModulesAction } from "./core/v2/actions/module";
import { emptyObservable } from "../../../core/rxjs/helpers/index";
import { MODULES_API_SERVER_PATH } from "./core/utils/types";
import {
  HTTP_SERVER_RESOURCE_CLIENT,
  IResourcesServerClient,
} from "src/app/lib/core/http";

@Component({
  selector: "app-app-modules",
  templateUrl: "./app-modules.component.html",
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppModulesComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  @Input() ressourceJsonKey!: string;

  modules$ = this.provider.state$.pipe(
    map((state) => state.items),
    catchError((err) => {
      return emptyObservable();
    })
  );

  constructor(
    private provider: ModulesProvider,
    @Inject(HTTP_SERVER_RESOURCE_CLIENT)
    private client: IResourcesServerClient<any>,
    @Inject(MODULES_API_SERVER_PATH) private path: string
  ) {}

  async ngOnInit() {
    getModulesAction(this.provider.store$)(this.client, this.path ?? "modules");
  }
}
