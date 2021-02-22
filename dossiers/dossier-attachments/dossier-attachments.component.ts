import { Component, Input, OnInit } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DossierWithFilesConfigInterface } from '../state/models/dossier';
import { DossiersProvider } from '../state/providers/dossier';
import { DrewlabsRessourceServerClient } from '../../../../domain/http/core/ressource-server-client';
import { HttpErrorResponse } from '@angular/common/http';
import { onErrorAction } from 'src/app/lib/domain/rxjs/state/rx-state';
import { emptyObservable } from 'src/app/lib/domain/rxjs/helpers';

@Component({
  selector: 'app-dossier-attachments',
  templateUrl: './dossier-attachments.component.html',
  styles: []
})
export class DossierAttachmentsComponent implements OnInit {

  @Input() dossierID: string;

  @Input() dossier: DossierWithFilesConfigInterface;

  constructor(private provider: DossiersProvider, private client: DrewlabsRessourceServerClient) { }

  ngOnInit(): void { }

  getDossierWithAttachmentsUsingID(id: string) {
    this.provider.getDossier(id).pipe(
      mergeMap(state => {
        if (state) {
          return this.provider.getDossierFiles(state)
            .pipe();
        }
        return emptyObservable();
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          const errorResponse = this.client.handleErrorResponse(err);
          onErrorAction(this.provider.store$)(errorResponse);
        } else {
          onErrorAction(this.provider.store$)(err);
        }
        return emptyObservable();
      })
    )
  }

}
