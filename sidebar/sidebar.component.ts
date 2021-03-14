import { Component, OnInit, Input } from '@angular/core';
import { RouteLink, RoutesMap, builLinkFromRoutesMap, IRouteLinkCollectionItem } from 'src/app/lib/domain/routes';
<<<<<<< HEAD
import { AbstractAlertableComponent } from 'src/app/lib/domain/helpers/component-interfaces';
import { AppUIStoreManager } from 'src/app/lib/domain/helpers/app-ui-store-manager.service';
import { AuthPathConfig, AuthService } from 'src/app/lib/domain/auth/core';
=======
import { AuthService } from 'src/app/lib/domain/auth/core';
>>>>>>> 45d7fa74c42df2eeb6529d16f0fe418ce3470c65
import { Collection } from 'src/app/lib/domain/collections';
import { TypeUtilHelper } from '../../../domain/helpers/type-utils-helper';
import { Authorizable, IAppUser, userCanAny } from 'src/app/lib/domain/auth/contracts/v2';
import { map } from 'rxjs/operators';
<<<<<<< HEAD
import { TranslationService } from 'src/app/lib/domain/translator';
import { Dialog } from 'src/app/lib/domain/utils';
import { Router } from '@angular/router';
import { adminPath, backendRoutePaths, defaultPath } from '../partials-configs';
=======
import { createStateful } from '../../../domain/rxjs/helpers/creator-functions';
import { combineLatest } from 'rxjs';
import { ICollection } from 'src/app/lib/domain/contracts/collection-interface';
>>>>>>> 45d7fa74c42df2eeb6529d16f0fe418ce3470c65

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
<<<<<<< HEAD
  // public elewouIcon = '/assets/images/icon-elewou.png';
  // public elewouIcon = 'https://avatars2.githubusercontent.com/u/19674422?s=400&u=cac639a76f40609d387cb57a138b723b50bfa51e&v=4';
  public elewouIcon = 'https://scontent.flfw1-1.fna.fbcdn.net/v/t1.0-9/129900309_3678495065550810_1722521212220721187_n.jpg?_nc_cat=102&ccb=3&_nc_sid=730e14&_nc_ohc=Jhfz9EmsyaMAX8BGeyd&_nc_ht=scontent.flfw1-1.fna&oh=1dafd888c9388daa883f12ebd42ceeca&oe=604B2045';

  public dashboardRoute = `/${defaultPath}`;
  public profileRoute = `/${defaultPath}/${adminPath.accountRoute}`;

  @Input() public moduleName: string;
  @Input() public applicationName: string;

  public modulesBackendRoute = backendRoutePaths.modules;

  // state$ = this.auth.state$.pipe(
  //   map(state => state.user)
  // );
  state$ = this.auth.state$.pipe(
    map(state => state.user as IAppUser),
    map(state => ({
        username: state.userDetails ?
        (state.userDetails.firstname && state.userDetails.lastname ? `${state.userDetails.firstname}, ${state.userDetails.lastname}` :
          (state.userDetails.email ? state.userDetails.email : state.username)) : state.username
    }))
=======
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
>>>>>>> 45d7fa74c42df2eeb6529d16f0fe418ce3470c65
  );


  constructor(
    public auth: AuthService,
<<<<<<< HEAD
    public readonly typeHelper: TypeUtilHelper,
    private translator: TranslationService,
    private dialog: Dialog,
    private router: Router
  ) {
    super(appUIStoreManager);
    this.navigationRoutes = new Collection();
  }
=======
    public readonly typeHelper: TypeUtilHelper
  ) {}
>>>>>>> 45d7fa74c42df2eeb6529d16f0fe418ce3470c65

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
