import { Component, OnInit, Input } from '@angular/core';
import { Collection } from 'src/app/lib/domain/utils/collection';
import { RouteLink, RoutesMap, builLinkFromRoutesMap, IRouteLinkCollectionItem } from '../../routes-definitions';
import { isDefined } from 'src/app/lib/domain/utils/type-utils';
import { User } from 'src/app/lib/domain/auth/models/user';
import { AuthPathConfig, AuthService } from 'src/app/lib/domain/auth/core';
import { Dialog } from 'src/app/lib/domain/utils/window-ref';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/lib/domain/translator';
import { AbstractAlertableComponent } from 'src/app/lib/domain/helpers/component-interfaces';
import { AppUIStoreManager } from 'src/app/lib/domain/helpers/app-ui-store-manager.service';
import { partialConfgis } from '../partials-configs';

@Component({
  selector: 'app-app-top-bar',
  templateUrl: './app-top-bar.component.html',
  styleUrls: ['./app-top-bar.component.scss']
})
export class AppTopBarComponent extends AbstractAlertableComponent implements OnInit {

  public navigationRoutes: Collection<RouteLink>;
  public routesIndexes: string[];
  public dashboardRoute: string;
  @Input() public routesMap: RoutesMap[];
  @Input() routeDescriptions: { [index: string]: string };
  @Input() public moduleName = 'Module name';
  @Input() public applicationName = 'Application name';
  public connectUser: User;
  public profileRoute = `/${partialConfgis.routes.commonRoutes.dashboardRoute}/${partialConfgis.routes.adminModuleRoutes.accountRoute}`;

  constructor(
    public appUIStoreManager: AppUIStoreManager,
    private auth: AuthService,
    private translator: TranslationService,
    private dialog: Dialog,
    private router: Router
  ) {
    super(appUIStoreManager);
    this.navigationRoutes = new Collection();
    this.dashboardRoute = `/${partialConfgis.routes.commonRoutes.dashboardRoute}`;
  }

  ngOnInit() {
    this.routesIndexes = this.routesMap.map((route) => route.key);
    this.connectUser = this.auth.user as User;
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

  public redirectToLogin() {
    this.router.navigate([AuthPathConfig.LOGIN_PATH], {
      replaceUrl: true
    });
    this.appUIStoreManager.completeUIStoreAction();
  }

  async actionLogout(event: Event) {
    event.preventDefault();
    const translation = await this.translator.translate('promptLogout').toPromise();
    if (this.dialog.confirm(translation)) {
      this.appUIStoreManager.initializeUIStoreAction();
      this.auth
        .logout()
        .then(_ => {
          this.redirectToLogin();
        })
        .catch(_ => {
          this.redirectToLogin();
        });
    }
  }

}
