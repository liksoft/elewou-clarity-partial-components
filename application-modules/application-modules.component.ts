import { Component } from '@angular/core';
import { ModuleService } from './module.service';
import { Module } from './module';

@Component({
  selector: 'app-application-modules',
  templateUrl: './application-modules.component.html',
  styles: []
})
export class ApplicationModulesComponent {

  public modules: Module[];

  constructor(public componentService: ModuleService) { }

}
