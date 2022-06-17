import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import {AppStateService} from "../services/core/app-state.service";

@Injectable({
  providedIn: 'root',
})
export class AnonymousGuard implements CanActivate {
  constructor(
    private readonly appState: AppStateService,
    private readonly router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const isAnonymous =
      !this.appState.identity ||
      !this.appState.identity.token;
    if (isAnonymous) {
      return true;
    }
    this.router.navigate(['/account/profile']);
    return false;
  }
}
