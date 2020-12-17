import { NgModule } from '@angular/core';
import { HttpRequestService } from 'src/app/lib/http/core';
import { TypeUtilHelper } from 'src/app/lib/helpers/type-utils-helper';
import { AbstractEntityProvider, DefaultEntityHandler } from 'src/app/lib/entity';
import { Module } from './core/module';
import { SessionStorage } from 'src/app/lib/storage/core';
import { GenericPaginatorDatasource } from 'src/app/lib/helpers/paginator';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { AppModulesComponent } from './app-modules.component';
import { DeclarativeEntityProvider } from 'src/app/lib/entity/declarative-entity-provider';
import { ISerializableBuilder } from 'src/app/lib/built-value/contracts/serializers';

@NgModule({
  exports: [
    AppModulesComponent
  ],
  declarations: [
    AppModulesComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
  ],
  providers: [
    // {
    //   provide: 'modulesDataSource',
    //   useFactory: (client: HttpRequestService, cache: SessionStorage) => {
    //     return new GenericPaginatorDatasource<Module>(client, cache);
    //   },
    //   deps: [HttpRequestService, SessionStorage],
    //   multi: false
    // },
    // {
    //   provide: 'moduleProvider',
    //   useFactory: (client: HttpRequestService, typeHelper: TypeUtilHelper) => {
    //     return new AbstractEntityProvider<Module>(typeHelper, new DefaultEntityHandler()).setProvider(client);
    //   },
    //   deps: [HttpRequestService, TypeUtilHelper],
    //   multi: false
    // },
    // {
    //   provide: 'ModuleDeclarativeProvider',
    //   useFactory: (client: HttpRequestService, typeHelper: TypeUtilHelper) => (new DeclarativeEntityProvider(
    //     Module.builder() as ISerializableBuilder<Module>,
    //     client
    //   )),
    //   deps: [HttpRequestService, TypeUtilHelper],
    //   // multi: false
    // }
  ]
})
export class AppModuleModule { }
