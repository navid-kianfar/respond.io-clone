import { Injectable } from '@angular/core';
import { TranslateService } from './translate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {StringDictionary} from "../../lib/dictionary";

const CONFIG = {
  verticalPosition: 'top',
  horizontalPosition: 'center',
  duration: 5000,
};

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private readonly translate: TranslateService,
    private readonly snackBar: MatSnackBar
  ) {}

  handleRequest(op: any): void {}

  clear(): void {
    this.snackBar.dismiss();
  }

  clean(input: string, replace: StringDictionary<string> = new StringDictionary<string>()): string {
    if (input) {
      input = this.translate.fromKey(input);
    }
    if (replace !== null) {
      replace.Keys().forEach((k) => {
        const value = replace.Item(k);
        k = k.replace('{', '\\{').replace('}', '\\}');
        input = input.replace(new RegExp(k, 'g'), value);
      });
    }
    return input;
  }

  error(
    message: string,
    replace: StringDictionary<string> = new StringDictionary<string>(),
    options: any = undefined
  ): void {
    message = message || 'GENERAL_ERROR';
    const params = { ...CONFIG, panelClass: 'error-snack', ...options };
    this.snackBar.open(this.clean(message, replace), undefined, params);
  }

  info(
    message: string,
    replace: StringDictionary<string> = new StringDictionary<string>(),
    options: any = undefined
  ): void {
    const params = { ...CONFIG, panelClass: 'info-snack', ...options };
    this.snackBar.open(this.clean(message, replace), undefined, params);
  }

  success(
    message: string,
    replace: StringDictionary<string> = new StringDictionary<string>(),
    options: any = undefined
  ): void {
    const params = { ...CONFIG, panelClass: 'success-snack', ...options };
    this.snackBar.open(this.clean(message, replace), undefined, params);
  }

  warning(
    message: string,
    replace: StringDictionary<string> = new StringDictionary<string>(),
    options: any = undefined
  ): void {
    const params = { ...CONFIG, panelClass: 'warning-snack', ...options };
    this.snackBar.open(this.clean(message, replace), undefined, params);
  }
}
