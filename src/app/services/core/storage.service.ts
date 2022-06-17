import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  get(key: string) {
    return localStorage.getItem(key) || undefined;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  set(key: string, value: any) {
    if (value === undefined || value === null) {
      localStorage.removeItem(key);
      return;
    }
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serialized);
  }
}
