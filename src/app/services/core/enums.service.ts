import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class EnumsService {
  repository: any = {};

  constructor(
    private readonly client: HttpClient
  ) {}

  async load(): Promise<void> {
    return new Promise((resolve, reject) => {
      const path = `${environment.api_endpoint}/general/enums`;
      this.client.get(path).subscribe(
        (response: any) => {
          this.repository = response;
          resolve();
        },
        (err: Error) => {
          this.repository = {};
          reject(err);
        }
      );
    });
  }

  toList(
    name: string,
    except: any[] = [],
    accept: any[] = [],
    info: boolean = false
  ): any[] {
    const items: any[] = [];
    const enumObj = this.repository[name];
    Object.keys(enumObj).forEach((key) => {
      const changed = key
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/-/g, '_');
      const enumChanged = name
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/-/g, '_');
      const text = `ENUMS_${enumChanged}_${changed}`.toUpperCase();
      const description = info ? text + '_DESC' : undefined;
      if (except.indexOf(enumObj[key]) !== -1) {
        return;
      }

      if (accept.length && accept.indexOf(enumObj[key]) === -1) {
        return;
      }

      items.push({
        text,
        separator: false,
        value: enumObj[key],
        description,
      });
    });

    return items;
  }

  translateKey(enumName: string, value: any): string {
    const enumKey =
      Object.keys(this.repository[enumName]).find((k) => {
        return this.repository[enumName][k] === value;
      }) || '';
    const keyFixed = enumKey
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/-/g, '_');
    const nameFixed = enumName
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/-/g, '_');
    return `ENUMS_${nameFixed}_${keyFixed}`.toUpperCase();
  }
}
