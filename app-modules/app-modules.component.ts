import { Component, Input, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { backendRoutePaths } from '../partials-configs';
import { ModulesProvider } from './core/v2/providers/module';
import { getModulesAction } from './core/v2/actions/module';
import { emptyObservable } from 'src/app/lib/rxjs/helpers';
import { DrewlabsRessourceServerClient } from 'src/app/lib/http/core';

@Component({
  selector: 'app-app-modules',
  templateUrl: './app-modules.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppModulesComponent implements AfterViewInit {

  // tslint:disable-next-line: variable-name
  @Input() ressourcePath: string;
  @Input() ressourceJsonKey: string;

  modules$ = this.provider.state$
    .pipe(
      map(state => state.items),
      catchError(err => {
        return emptyObservable();
      })
    );

  constructor(
    private provider: ModulesProvider,
    private client: DrewlabsRessourceServerClient
  ) { }

  async ngAfterViewInit() {
    getModulesAction(this.provider.store$)(this.client, this.ressourcePath || backendRoutePaths.modules);
  }

}
