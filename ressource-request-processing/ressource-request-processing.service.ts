import { Injectable } from '@angular/core';
import {
  postRessource,
  deleteRessource,
  putRessource
} from 'src/app/lib/domain/contracts/abstract-request-client';
import { HttpRequestService, IResponseBody } from 'src/app/lib/domain/http/core';
import { ISerializableBuilder } from 'src/app/lib/domain/built-value/contracts/serializers';
import { TranslationService } from 'src/app/lib/domain/translator/translator.service';
import { RessourceAssignment } from './ressource-assignment';

@Injectable()
export class RessourceRequestProcessingService {

  public readonly assignationRessoucesPath = 'ressources/ressource_assignations';

  /**
   * @description Service initializer
   */
  constructor(
    private client: HttpRequestService,
    private translate: TranslationService
  ) {
  }

  /**
   * @description Returns a list of translation that can be use on the Immatriculation component and it children
   */
  loadTranslations(ressourceId: string|number, username?: string): Promise<any> {
    return this.translate.translate([
      'invalidRequestParams',
      'serverRequestFailed',
      'successfulRequest',
      'validationPrompt',
      'rejectionPrompt',
      'successfulValidation',
      'successfulRejection',
      'assignmentPrompt',
      'successfullAssignment'
    ], {name: `Demande No ${ressourceId}`, username}).toPromise();
  }

  // /**
  //  * @description Get a user based on it unique identifier
  //  * @param endpoint [[string]]
  //  * @param id [[number|string]]
  //  */
  // public getRessource(endpoint: string, id: number | string) {
  //   return loadRessourceFromCacheOrGetFromServer(
  //     this.cache,
  //     this.client,
  //     endpoint,
  //     id,
  //     'ressource_assignations',
  //     (User.builder() as ISerializableBuilder<User>)
  //   );
  // }

  public createAssignment(requestURL: string, requestBody: object) {
    return postRessource<RessourceAssignment>(
      this.client,
      `${requestURL}`,
      requestBody,
      RessourceAssignment.builder() as ISerializableBuilder<RessourceAssignment>
    );
  }

  /**
   * @inheritdoc
   */
  deleteRessource(requestURL: string, id: any): Promise<IResponseBody> {
    return deleteRessource<RessourceAssignment>(
      this.client,
      requestURL,
      id,
    );
  }

  /**
   * @inheritdoc
   */
  updateRessource(requestURL: string, id: any, values: object): Promise<IResponseBody> {
    return putRessource<RessourceAssignment>(
      this.client,
      `${requestURL}`,
      id,
      values,
    );
  }
}
