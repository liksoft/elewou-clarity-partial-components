import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  RouteLink,
  RoutesMap,
  routeMapToLink,
  RouteLinkCollectionItemInterface,
} from "../routes";
import { defaultPath, commonRoutes } from "../partials-configs";
import { Collection } from "src/app/lib/core/collections";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";

interface TopBarUserDetails {
  username: string;
  email: string;
}

@Component({
  selector: "app-top-bar",
  templateUrl: "./topbar.component.html",
  styles: [
    `
      .title {
        padding: 0 16px;
      }
      .header .branding,
      header .branding {
        padding: 0 0 0 1rem;
      }
      .app-logo {
        width: 20%;
      }
    `,
  ],
})
export class AppTopBarComponent implements OnInit {

  // Navigation Routes
  public links = new Collection<RouteLink>();
  public routesIndexes!: string[];
  public dashboardRoute = `/${defaultPath}`;
  public profileRoute = `/${defaultPath}/${commonRoutes.settings}`;

  @Input() public routesMap!: RoutesMap[];
  @Input() public routeDescriptions!: { [index: string]: string };
  @Input() public moduleName!: string;
  @Input() public applicationName!: string;
  @Input() public companyName!: string;
  @Input() public user!: TopBarUserDetails;
  @Input() public isGuest: boolean = false;
  @Input() public performingAction = false;

  @Output() logoutEvent = new EventEmitter<string>();

  state$ = combineLatest([this.translator.get("promptLogout")]).pipe(
    map(([translation]) => ({
      logoutMessage: translation,
    }))
  );

  constructor(private translator: TranslateService) {}

  ngOnInit(): void {
    this.routesIndexes = this.routesMap.map((route) => route.key);
    routeMapToLink(this.routesMap, this.routeDescriptions).forEach(
      (item: RouteLinkCollectionItemInterface) =>
        this.links.add(item.key, item.value)
    );
  }

  /**
   * @description Get [[RouteLink]] instance from the collection of RouteLink
   * @param key [[string]]
   */
  public getRouteLinkFromMap(key: string): RouteLink {
    return this.links.get(key);
  }

  async actionLogout(event: Event, message: string) {
    event.preventDefault();
    this.logoutEvent.emit(message);
  }
}
