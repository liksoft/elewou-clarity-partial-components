import { Component, Input, ChangeDetectionStrategy, OnInit, Inject } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ModulesProvider } from './core/v2/providers/module';
import { DrewlabsRessourceServerClient } from '../../../core/http/core/ressource-server-client';
import { getModulesAction } from './core/v2/actions/module';
import { emptyObservable } from '../../../core/rxjs/helpers/index';
import { MODULES_API_SERVER_PATH } from './core/utils/tokens';

@Component({
  selector: 'app-app-modules',
  templateUrl: './app-modules.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppModulesComponent implements OnInit {

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
    private client: DrewlabsRessourceServerClient,
    @Inject(MODULES_API_SERVER_PATH) private _path = null
  ) {
    this.ressourcePath = _path
  }

  async ngOnInit() {
    getModulesAction(this.provider.store$)(this.client, this.ressourcePath ?? 'modules');
  }

}
