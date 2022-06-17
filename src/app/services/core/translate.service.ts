import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {CultureService} from "./culture.service";
import {StringHelpers} from "../../lib/helpers/string.helpers";

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private readonly repository: any = null;

  constructor(
    readonly client: HttpClient,
    private readonly cultureService: CultureService
  ) {
    this.repository = {};
    this.repository[this.cultureService.lang] = {};
  }

  async load(culture: string = environment.lang): Promise<boolean> {
    return new Promise((resolve, reject) => {
      culture =
        localStorage.getItem(this.cultureService.LANG_STORAGE_KEY) || culture;
      localStorage.setItem(this.cultureService.LANG_STORAGE_KEY, culture);
      this.cultureService.fromLanguage(culture);
      const path = `assets/i18n/${culture}.json?rand=${new Date().getTime()}`;
      this.client.get(path).subscribe(
        (response: any) => {
          this.repository[culture] = response;
          resolve(true);
        },
        (err: Error) => {
          this.repository[culture] = {};
          reject(err);
        }
      );
    });
  }

  public formatted(key: string, params: any[]): string {
    const trans = this.fromKey(key);
    return StringHelpers.format(trans, params);
  }

  public fromKey(
    value: string,
    skipLog: boolean = false,
    fallback: string = ''
  ): string {
    value = value || '';
    let result = this.repository[this.cultureService.lang][value];
    if ((result === null || result === undefined) && fallback) {
      result = this.repository[this.cultureService.lang][fallback];
    }
    if ((result === null || result === undefined) && !skipLog) {
      // console.log('Translate not found : ', value);
    }
    return result || fallback || (value || '').toString().replace(/_/g, ' ');
  }
}
