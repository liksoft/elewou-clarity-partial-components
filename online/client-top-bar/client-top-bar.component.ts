import { Component, OnInit, Input } from '@angular/core';
import { AbstractAlertableComponent } from 'src/app/lib/domain/helpers/component-interfaces';
import { partialConfigs } from '../../partials-configs';
import { Collection } from 'src/app/lib/domain/utils/collection';
import { AppUIStoreManager } from 'src/app/lib/domain/helpers/app-ui-store-manager.service';
import { AuthService, AuthPathConfig } from 'src/app/lib/domain/auth/core';
import { RouteLink, RoutesMap, builLinkFromRoutesMap, IRouteLinkCollectionItem } from '../../../routes-definitions';
import { User } from 'src/app/lib/domain/auth/models/user';
import { TranslationService } from 'src/app/lib/domain/translator';
import { Dialog } from 'src/app/lib/domain/utils/window-ref';
import { Router } from '@angular/router';
import { TypeUtilHelper } from 'src/app/lib/domain/helpers/type-utils-helper';

declare var require: any;

@Component({
  selector: 'app-client-top-bar',
  templateUrl: './client-top-bar.component.html',
  styleUrls: ['./client-top-bar.component.scss']
})

export class ClientTopBarComponent extends AbstractAlertableComponent implements OnInit {

  public elewouLogo = require('../../assets/images/logo-elewou-main.png');
  public elewouIcon = require('../../assets/images/icon-elewou.png');

  public navigationRoutes: Collection<RouteLink>;
  public routesIndexes: string[];
  public dashboardRoute: string;
  @Input() public routesMap: RoutesMap[];
  @Input() routeDescriptions: { [index: string]: string };
  @Input() public moduleName = 'Module name';
  @Input() public applicationName = 'Application name';
  public connectUser: User;
  public profileRoute = `/${partialConfigs.routes.commonRoutes.dashboardRoute}/${partialConfigs.routes.adminModuleRoutes.accountRoute}`;

  constructor(
    public appUIStoreManager: AppUIStoreManager,
    private auth: AuthService,
    private translator: TranslationService,
    private dialog: Dialog,
    private router: Router,
    public readonly typeHelper: TypeUtilHelper
  ) {
    super(appUIStoreManager);
    this.navigationRoutes = new Collection();
    this.dashboardRoute = `/${partialConfigs.routes.commonRoutes.dashboardRoute}`;
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
