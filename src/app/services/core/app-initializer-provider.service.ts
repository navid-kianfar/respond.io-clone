import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {IdentityService} from "../account/identity.service";
import {TranslateService} from "./translate.service";
import {AppStateService} from "./app-state.service";

@Injectable()
export class AppInitializerProvider {
  constructor(
    private readonly http: HttpClient,
    private readonly translateService: TranslateService,
    private readonly identityService: IdentityService,
    readonly appState: AppStateService,
  ) {  }


  loadAssets(): Promise<void> {
    // @ts-ignore
    const loader = window.$script;
    return new Promise<void>((resolve) => {
      resolve();
      // loader('/assets/plugins/emoji/picmo.js', () => resolve());
    });
  }

  async load(): Promise<void> {
    const promise1 = this.identityService.load();
    const promise2 = this.translateService.load();
    const promise3 = this.loadAssets();

    return Promise.all([promise1, promise2, promise3])
      .catch(() => Promise.reject())
      .then(() => Promise.resolve());
  }
}

export function AppInitializerFactory(provider: AppInitializerProvider): any {
  return () =>
    provider.load().then(
      () => (provider.appState.initialized = true),
      () => {
        console.log('INITIALIZE_FAILED');
        // window.location.reload();
      }
    );
}
