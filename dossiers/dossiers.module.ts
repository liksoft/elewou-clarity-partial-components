import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { DossierFilesPresenterComponent } from './dossier-files-presenter/dossier-files-presenter.component';
import { ModuleDossierDepositsComponent } from './module-dossier-deposits.component';
import { DossiersProvider } from './state/providers/dossier';
import { TranslateModule } from '@ngx-translate/core';
import { CustomPipesModule } from 'src/app/lib/domain/components/pipes';
import { DossierAttachmentsComponent } from './dossier-attachments/dossier-attachments.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    TranslateModule,
    CustomPipesModule
  ],
  exports: [
    ModuleDossierDepositsComponent,
    DossierFilesPresenterComponent,
    DossierAttachmentsComponent
  ],
  declarations: [
    ModuleDossierDepositsComponent,
    DossierFilesPresenterComponent,
    DossierAttachmentsComponent
  ]
})
export class DossiersModule {
  static forRoot(configs?: {dossiersPath: string, dossierFilesPath: string, rightHolderDossierPath: string}): ModuleWithProviders<DossiersModule> {
    return {
      ngModule: DossiersModule,
      providers: [
        DossiersProvider,
        {
          provide: 'DOSSIER_FILES_ENDOINT',
          useValue: configs?.dossierFilesPath || 'dossier-files'
        },
        {
          provide: 'DOSSIER_ENDPOINT',
          useValue: configs?.dossiersPath || 'dossiers'
        },
        {
          provide: 'RIGHT_HOLDER_DOSSIER_ENPOINT',
          useValue: configs?.rightHolderDossierPath || 'right-holder-dossiers'
        }
      ]
    }
  }
}
