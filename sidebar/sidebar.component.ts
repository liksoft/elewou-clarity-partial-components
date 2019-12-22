import { Component, OnInit, Input } from '@angular/core';
import { Collection } from 'src/app/lib/domain/utils/collection';
import { RouteLink, RoutesMap, builLinkFromRoutesMap, IRouteLinkCollectionItem, AppRoutes } from '../../routes-definitions';
import { isDefined } from 'src/app/lib/domain/utils/type-utils';
import { AbstractAlertableComponent } from 'src/app/lib/domain/helpers/component-interfaces';
import { AppUIStoreManager } from 'src/app/lib/domain/helpers/app-ui-store-manager.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends AbstractAlertableComponent implements OnInit {
  public navigationRoutes: Collection<RouteLink>;
  public routesIndexes: string[];
  @Input() public routesMap: RoutesMap[];
  @Input() routeDescriptions: { [index: string]: string };

  constructor(public appUIStoreManager: AppUIStoreManager) {
    super(appUIStoreManager);
    this.navigationRoutes = new Collection();
  }

  ngOnInit() {
    this.routesIndexes = this.routesMap.map((route) => route.key);
    builLinkFromRoutesMap(this.routesMap, this.routeDescriptions).forEach(
      (item: IRouteLinkCollectionItem) =>
        this.navigationRoutes.add(item.key, item.value)
    );
  }

  /**
   * @description Checks if a given value is null or undefined
   * @param value [[value]]
   */
  public isDefined(value: any) {
    return isDefined(value);
  }

  /**
   * @description Get [[RouteLink]] instance from the collection of RouteLink
   * @param key [[string]]
   */
  public getRouteLinkFromMap(key: string): RouteLink {
    return this.navigationRoutes.get(key);
  }

}
