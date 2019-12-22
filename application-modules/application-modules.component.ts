import { Component, OnInit } from '@angular/core';
import { ModuleService } from './module.service';
import { Module } from './module';
import { Store } from 'src/app/lib/domain/store';
import { MODULES_STORE } from './module-reducer';
import { List } from 'immutable';
import { isDefined } from 'src/app/lib/domain/utils/type-utils';

@Component({
  selector: 'app-application-modules',
  templateUrl: './application-modules.component.html',
  styles: []
})
export class ApplicationModulesComponent implements OnInit {

  public modules: Module[];

  constructor(private componentService: ModuleService, private store: Store<Module>) { }

  async ngOnInit() {
    this.store.get(MODULES_STORE).values().subscribe((modules: List<Module>) => {
      if (isDefined(modules)) {
        this.modules = modules.toArray();
      }
    });
    await this.componentService.getModules();
  }

}
