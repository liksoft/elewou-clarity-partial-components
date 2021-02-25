import { Component, Input, OnInit } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { DossierWithFilesConfigInterface } from '../state/models/dossier';
import { DossiersProvider } from '../state/providers/dossier';
import { DrewlabsRessourceServerClient } from '../../../../domain/http/core/ressource-server-client';
import { getDossierUsingID } from '../state/actions/dossier';
import { doLog } from '../../../../domain/rxjs/operators/index';
import { dossierResponseTypeToApplicationTypeDossier } from '../state/helpers';
import { isDefined } from '../../../../domain/utils/types/type-utils';

@Component({
  selector: 'app-dossier-attachments',
  templateUrl: './dossier-attachments.component.html',
  styles: []
})
export class DossierAttachmentsComponent implements OnInit {

  @Input() set dossierID(value: string) {
    this.getDossierWithAttachmentsUsingID(value);
  }
  @Input() dossier: DossierWithFilesConfigInterface;
  state$ = this.provider.state$.pipe(
    filter(state  => isDefined(state.currentDossier)),
    map(state => ({
      ...state,
      dossier: dossierResponseTypeToApplicationTypeDossier(state?.currentDossier)
    })),
    doLog('<DossierAttachmentsComponent> state: ')
  );
  @Input() performingAction = false;

  constructor(
    private provider: DossiersProvider,
    private client: DrewlabsRessourceServerClient
  ) { }

  ngOnInit(): void { }

  getDossierWithAttachmentsUsingID(id: string) {
    getDossierUsingID(this.provider.store$)(this.client, this.provider.dossierEndpointURL, id);
  }

}
