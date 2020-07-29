import { Component, OnInit, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { Module } from './core/module';
import { DeclarativeEntityProvider } from 'src/app/lib/domain/entity/declarative-entity-provider';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { backendRoutePaths } from '../partials-configs';

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
  modules$ = this.provider.allEntity$
    .pipe(
      catchError(err => {
        console.log(err);
        return EMPTY;
      })
    );

  constructor(
    @Inject('ModuleDeclarativeProvider') private provider: DeclarativeEntityProvider<Module>,
  ) { }

  async ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.provider.getAll(
      { path: this.ressourcePath || backendRoutePaths.modules, dataKey: this.ressourceJsonKey });
  }

}
