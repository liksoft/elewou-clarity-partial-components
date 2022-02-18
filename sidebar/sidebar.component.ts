import { Component, Input } from "@angular/core";
import {
  RouteLink,
  RoutesMap,
  routeMapToLink,
  RouteLinkCollectionItemInterface,
} from "../routes";
import { Collection } from "src/app/lib/core/collections";
import { map } from "rxjs/operators";
import { defaultPath, commonRoutes } from "../partials-configs";
import { BehaviorSubject } from "rxjs";
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: [
    `
      :host ::ng-deep .clr-vertical-nav {
        min-height: 100%;
        height: 100%;
      }
    `,
  ],
})
export class SidebarComponent {
  @Input() set routesMap(value: RoutesMap[]) {
    if (value) {
      this._routesMap$.next(value);
    }
  }
  @Input() routeDescriptions!: { [index: string]: string };

  public dashboardRoute = `/${defaultPath}`;
  public profileRoute = `/${defaultPath}/${commonRoutes.settings}`;

  @Input() public moduleName!: string;
  @Input() public applicationName!: string;

  private _routesMap$ = new BehaviorSubject<RoutesMap[]>([]);

  state$ = this._routesMap$.asObservable().pipe(
    map((routeMaps_) => {
      // Construct the route mapping here
      const routeMaps = routeMaps_;
      const routesIndexes = routeMaps.map((route) => route.key);
      const routeLinks = new Collection<RouteLink>();
      routeMapToLink(routeMaps, this.routeDescriptions).forEach(
        (item: RouteLinkCollectionItemInterface) =>
          routeLinks.add(item.key, item.value)
      );
      return { routeMaps, routeLinks, routesIndexes };
    }),
    map((state) => ({
      routeMaps: state?.routeMaps,
      routeLinks: state?.routeLinks,
      routesIndexes: state?.routesIndexes,
    }))
  );

  isFirstRoute(routes: RoutesMap[], item: RoutesMap): boolean {
    return routes.indexOf(item) === 0;
  }
}
