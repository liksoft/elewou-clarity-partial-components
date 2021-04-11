import { Component, OnInit, Input } from '@angular/core';
import { AbstractAlertableComponent } from 'src/app/lib/core/helpers/component-interfaces';
import { partialConfigs } from '../../partials-configs';
import { AppUIStoreManager } from 'src/app/lib/core/helpers/app-ui-store-manager.service';
import { AuthService, AuthPathConfig } from 'src/app/lib/core/auth/core';
import { RouteLink, RoutesMap, builLinkFromRoutesMap, IRouteLinkCollectionItem } from 'src/app/lib/core/routes';
import { TranslationService } from 'src/app/lib/core/translator';
import { Router } from '@angular/router';
import { TypeUtilHelper } from 'src/app/lib/core/helpers/type-utils-helper';
import { Collection } from 'src/app/lib/core/collections';
import { Dialog } from 'src/app/lib/core/utils';
import { User } from 'src/app/lib/core/auth/contracts/v2';

@Component({
  selector: 'app-client-top-bar',
  templateUrl: './client-top-bar.component.html',
  styleUrls: ['./client-top-bar.component.scss']
})

export class ClientTopBarComponent extends AbstractAlertableComponent implements OnInit {

  public elewouLogo; // require('../../assets/images/logo-elewou-main.png');
  public elewouIcon; // require('../../assets/images/icon-elewou.png');

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

  ngOnInit(): void {
    this.routesIndexes = this.routesMap.map((route) => route.key);
    // tslint:disable-next-line: deprecation
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

  public redirectToLogin(): void {
    this.router.navigate([AuthPathConfig.LOGIN_PATH], {
      replaceUrl: true
    });
    this.appUIStoreManager.completeUIStoreAction();
  }

  async actionLogout(event: Event): Promise<void> {
    event.preventDefault();
    const translation = await this.translator.translate('promptLogout').toPromise();
    if (this.dialog.confirm(translation)) {
      this.appUIStoreManager.initializeUIStoreAction();
      await this.auth.logout().toPromise();
      this.appUIStoreManager.completeUIStoreAction();
    }
  }

}
