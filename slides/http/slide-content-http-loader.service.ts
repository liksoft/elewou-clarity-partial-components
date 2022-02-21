import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import { isString } from "lodash";
import { map } from "rxjs/operators";
import { doLog } from "src/app/lib/core/rxjs/operators";
import {
  SlideContentBuilder,
  SlideContentDataLoader,
  SlideData,
  SlidesContents,
} from "../slide-content-loader";

export const ASSETS_PATH = new InjectionToken<string>(
  "Provider for a path to the slide contents"
);

@Injectable()
export class SlideContentHttpLoader
  implements SlideContentDataLoader, SlideContentBuilder
{
  private _contents!: SlidesContents;

  get contents() {
    return this._contents;
  }

  constructor(
    private client: HttpClient,
    @Inject(ASSETS_PATH) private _path: string
  ) {}

  async load(): Promise<boolean> {
    return await this.client
      .get(this._path)
      .pipe(
        map((content) => {
          this._contents = content as SlidesContents;
          return true;
        })
      )
      .toPromise();
  }
  build(data: string | SlideData): string {
    return `<img class="slide-img" src="${
      isString(data) ? data : data.toString()
    }" alt="">`;
  }
}
