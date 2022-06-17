import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CultureService {
  private currentLanguage: string = '';
  private currentDir: string = '';
  private currentCulture: string = '';
  public readonly LANG_STORAGE_KEY = 'LANG_STORAGE_KEY';

  constructor() {
    this.fromLanguage(environment.lang);
  }

  public fromLanguage(lang: string) {
    this.currentLanguage = lang;
    switch (lang.toLowerCase()) {
      case 'tr':
        this.currentCulture = 'tr-TR';
        this.currentDir = 'ltr';
        break;
      case 'de':
        this.currentCulture = 'de-DE';
        this.currentDir = 'ltr';
        break;
      case 'ar':
        this.currentCulture = 'ar-SA';
        this.currentDir = 'rtl';
        break;
      case 'ru':
        this.currentCulture = 'ru-RU';
        this.currentDir = 'ltr';
        break;
      case 'it':
        this.currentCulture = 'it-IT';
        this.currentDir = 'ltr';
        break;
      case 'fr':
        this.currentCulture = 'fr-FR';
        this.currentDir = 'ltr';
        break;
      case 'es':
        this.currentCulture = 'es-SP';
        this.currentDir = 'ltr';
        break;
      case 'nl':
        this.currentCulture = 'nl-NL';
        this.currentDir = 'ltr';
        break;
      default:
        this.currentCulture = 'en-US';
        this.currentDir = 'ltr';
        break;
    }

    const html = document.querySelector('html')!;
    html.lang = this.currentLanguage;
    html.dir = this.currentDir;
  }

  public get lang(): string {
    return this.currentLanguage;
  }

  public get culture(): string {
    return this.currentCulture;
  }

  public get dir(): string {
    return this.currentDir;
  }

  public get rtl(): boolean {
    return this.currentDir === 'rtl';
  }
}
