import { Component, OnInit, Input } from '@angular/core';
import { RouteLink, RoutesMap, builLinkFromRoutesMap, IRouteLinkCollectionItem } from 'src/app/lib/domain/routes';
import { AppUIStoreManager } from 'src/app/lib/domain/helpers/app-ui-store-manager.service';
import { AuthPathConfig, AuthService } from 'src/app/lib/domain/auth/core';
import { Collection } from 'src/app/lib/domain/collections';
import { TypeUtilHelper } from '../../../domain/helpers/type-utils-helper';
import { Authorizable, IAppUser, userCanAny } from 'src/app/lib/domain/auth/contracts/v2';
import { map } from 'rxjs/operators';
import { createStateful } from '../../../domain/rxjs/helpers/creator-functions';
import { combineLatest } from 'rxjs';
import { ICollection } from 'src/app/lib/domain/contracts/collection-interface';
import { TranslationService } from 'src/app/lib/domain/translator';
import { Dialog } from 'src/app/lib/domain/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  // public navigationRoutes: Collection<RouteLink>;
  public routesIndexes: string[];
  private _routesMap: RoutesMap[] = [];
  @Input() routeDescriptions: { [index: string]: string };
  @Input() set routesMap(value: RoutesMap[]) {
      this._routesMap = value;
  }
  get routesMap() {
    return this._routesMap;
  }
  // @Input() expanded = true;

  private _navigationRoutes$ = createStateful<Collection<RouteLink>>(new Collection());
  state$ = combineLatest([
    this.auth.state$,
    this._navigationRoutes$.asObservable()
  ]).pipe(
    map(([state, routes]) => ({
      user: state.user,
      routes
    })),
  );


  constructor(
    public appUIStoreManager: AppUIStoreManager,
    public auth: AuthService,
    public readonly typeHelper: TypeUtilHelper,
    private translator: TranslationService,
    private dialog: Dialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const collection = new Collection<RouteLink>();
    this.routesIndexes = this._routesMap.map((route) => route.key);
    builLinkFromRoutesMap(this._routesMap, this.routeDescriptions).forEach(
      (item: IRouteLinkCollectionItem) =>
        collection.add(item.key, item.value)
    );
    this._navigationRoutes$.next(collection);
  }

  isFirstRoute(routes: RoutesMap[], item: RoutesMap): boolean {
    return routes.indexOf(item) === 0;
  }

  /**
   * @description Get [[RouteLink]] instance from the collection of RouteLink
   * @param key [[string]]
   */
  public getRouteLinkFromMap(routes: ICollection<RouteLink>, key: string): RouteLink {
    return routes.get(key);
  }

  hasAuthorizations(user: Authorizable, authorizations: string[]): boolean {
    return userCanAny(user, authorizations);
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
    }
  }

}
