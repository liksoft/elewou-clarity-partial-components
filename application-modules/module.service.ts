import { Injectable } from '@angular/core';
import {
  IDataSourceService,
  ISource,
  ISourceRequestQueryParameters
} from 'src/app/lib/domain/components/ng-data-table/ng-data-table.component';
import { Module } from 'src/app/lib/presentation/partials/application-modules/module';
import {
  HttpGetAllRequestFn,
  loadRessourceFromCacheOrGetFromServer,
  postRessourceAndNotifiStore,
  getRessources
} from 'src/app/lib/domain/contracts/abstract-request-client';
import { SessionStorage } from 'src/app/lib/domain/storage/core';
import { isDefined, isArray } from 'src/app/lib/domain/utils/type-utils';
import { IResponseBody, ResponseBody, ResponseData, HttpRequestService } from 'src/app/lib/domain/http/core';
import { ModuleBuilder } from 'src/app/lib/presentation/partials/application-modules/module';
import { Store } from 'src/app/lib/domain/store';
import { ISerializableBuilder } from 'src/app/lib/domain/built-value/contracts/serializers';
import { MODULE_CREATED } from './module-reducer';
import { RequestClient, deleteRessource, putRessource } from '../../../domain/contracts/abstract-request-client';
import { Role } from 'src/app/lib/domain/auth/models/role';
import { FormService } from '../../../domain/components/dynamic-inputs/core/form-control/form.service';
import { environment } from '../../../../../environments/environment';
import { IDynamicForm } from 'src/app/lib/domain/components/dynamic-inputs/core';
import { TranslationService } from 'src/app/lib/domain/translator';
import { DynamicFormHelpers } from 'src/app/lib/domain/helpers/component-reactive-form-helpers';

class ModulesDataSource implements IDataSourceService<ISource<Module>> {

  private ressourcesGetterMethod: HttpGetAllRequestFn;
  public ressourcesPath: string;
  private client: HttpRequestService;
  public readonly systemModulesStorageKey: string;

  constructor(client: HttpRequestService, fn: HttpGetAllRequestFn, path: string, private cache: SessionStorage) {
    this.ressourcesGetterMethod = fn;
    this.ressourcesPath = path;
    this.client = client;
    this.systemModulesStorageKey = 'System_Modules_';
  }
  getItems(params: ISourceRequestQueryParameters) {
    // Return a promise of an Http Request
    return new Promise<ISource<Module>>((resolve, reject) => {
      // Build request query parameters
      let query = `?page=${params.page ? params.page : 1}`;
      if (isDefined(params.perPage)) {
        query += `&per_page=${params.perPage}`;
      }
      if (isDefined(params.by)) {
        query += `&by=${params.by}&order=${params.order ? params.order : 'desc'}`;
      }
      this.ressourcesGetterMethod(this.client, `${this.ressourcesPath}${query}`).then((res: ResponseData) => {
        const body: IResponseBody = new ResponseBody(
          Object.assign(res.body, { status: res.code })
        );
        let modules = [];
        if ((res.success === true) && isArray(body.data.modules.data)) {
          this.cache.set(`${this.systemModulesStorageKey}`, body.data.modules.data);
          modules = (body.data.modules.data as Array<any>).map((value) => {
            return (new ModuleBuilder()).fromSerialized(value);
          });
        }
        resolve({
          data: modules,
          total: body.data.modules.total
        });
      })
        .catch(err => reject(err));
    });
  }

}

@Injectable()
export class ModuleService {

  public ressourcesPath: string;
  public readonly dataSource: IDataSourceService<ISource<Module>>;
  public moduleFormID = environment.forms.modules;

  /**
   * @description Service initializer
   */
  constructor(
    private client: HttpRequestService,
    private cache: SessionStorage,
    private store: Store<Module>,
    private translate: TranslationService,
    private formService: FormService
  ) {
    this.ressourcesPath = 'ressources/modules';
    this.dataSource = new ModulesDataSource(client, new RequestClient().get, this.ressourcesPath, cache);
  }

  /**
   * @description Returns a list of translation that can be use on the module component and it children
   */
  loadTranslations(): Promise<any> {
    return this.translate.translate([
      'invalidRequestParams',
      'serverRequestFailed',
      'successfulRequest',
      'prompt'
    ]).toPromise();
  }

  /**
   * @description Load the create role form from the form and form controls providers
   */
  loadModuleForm(): Promise<IDynamicForm> {
    return new Promise((resolve, _) => {
      this.formService.getForm(this.moduleFormID).then(async (f) => {
        resolve(await DynamicFormHelpers.buildDynamicForm(f, this.translate));
      })
        .catch((err) => { _(err); });
    });
  }

  /**
   * @description Convert a list of module roles to string
   * @param roles [[Role[]]]
   */
  transformListOfModuleRolesToString(roles: Role[]): string {
    if (!isDefined(roles)) {
      return '';
    }
    return roles.map((r) => r.label).join(', ');
  }

  /**
   * @description Get a user based on it unique identifier
   * @param id [[number|string]]
   */
  public getSelectedModule(id: number | string) {
    return loadRessourceFromCacheOrGetFromServer(
      this.cache,
      this.client,
      this.ressourcesPath,
      id,
      (this.dataSource as ModulesDataSource).systemModulesStorageKey,
      (Module.builder() as ISerializableBuilder<Module>)
    );
  }

  public getModules(): Promise<any> {
    return getRessources<Module>(
      this.client,
      this.ressourcesPath,
      Module.builder() as ISerializableBuilder<Module>,
      'modules'
    );
  }

  public createModule(requestURL: string, requestBody: object) {
    return postRessourceAndNotifiStore<Module>(
      this.client,
      `${isDefined(requestURL) ? requestURL : this.ressourcesPath}`,
      requestBody,
      Module.builder() as ISerializableBuilder<Module>,
      this.store,
      MODULE_CREATED
    );
  }

  /**
   * @inheritdoc
   */
  deleteModule(id: any): Promise<IResponseBody> {
    return deleteRessource<Module>(
      this.client,
      this.ressourcesPath,
      id
    );
  }

  /**
   * @inheritdoc
   */
  updateModule(requestURL: string, id: any, values: object): Promise<IResponseBody> {
    return putRessource<Module>(
      this.client,
      `${isDefined(requestURL) ? requestURL : this.ressourcesPath}`,
      id,
      values
    );
  }

  /**
   * @description Checks if the value of the parameter is defined or not
   * @param value [[any]]
   */
  isDefined(value: any) {
    return isDefined(value);
  }
}
