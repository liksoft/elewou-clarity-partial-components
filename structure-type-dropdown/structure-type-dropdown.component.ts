import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractAlertableComponent } from 'src/app/lib/domain/helpers/component-interfaces';
import { StructureType } from '../../../application/models/structure-type';
import { getRessources } from '../../../domain/contracts/abstract-request-client';
import { AppUIStoreManager } from 'src/app/lib/domain/helpers/app-ui-store-manager.service';
import { HttpRequestService } from '../../../domain/http/core/http-request.service';
import { ISerializableBuilder } from '../../../domain/built-value/contracts/serializers';

@Component({
  selector: 'app-structure-type-dropdown',
  templateUrl: './structure-type-dropdown.component.html',
  styles: [
    `
    .dropdown .dropdown-toggle.btn {
      margin-right: .5rem;
    }
    .clr-dropdown-menu {
      max-height: 200px;
      width: 100%;
    }

    .users-viewport {
      min-height: 75px;
      width: auto;
      overflow-x: hidden;
    }
    `
  ]
})
export class StructureTypeDropdownComponent extends AbstractAlertableComponent implements OnInit {

  public types: StructureType[];
  @Output() structureTypeSelected = new EventEmitter<object>();
  private structureTypesEndpoint = 'https://dev.liksoft.tg/api/ressources/structure_types';
  constructor(
    uiStore: AppUIStoreManager,
    private client: HttpRequestService
  ) { super(uiStore); }

  ngOnInit() {
    // this.authenticatedUser = this.auth.user as User;
    getRessources(
      this.client,
      this.structureTypesEndpoint,
      StructureType.builder() as ISerializableBuilder<StructureType>
    ).then((types) => {
      types.push((StructureType.builder() as ISerializableBuilder<StructureType>).fromSerialized({id: null, label: 'Tout'}));
      this.types = types;

    }).catch((_) => console.log(_));
  }
}
