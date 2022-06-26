import { Injectable } from '@angular/core';
import {IdentityDto, IdentityProfileDto} from "../../dtos/account-dtos";
import { NavigationDto } from '../../dtos/layout-dtos';
import {OrganizationDto} from "../../dtos/organization-dtos";
import {WorkspaceDto} from "../../dtos/workspace-dtos";
import {StorageService} from "./storage.service";
import {APP_TOKEN_KEY} from "../../lib/constants";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  initialized: boolean = false;
  navigation: NavigationDto = {menus: []};
  workspace?: WorkspaceDto = undefined;
  organization?: OrganizationDto = undefined;
  profile?: IdentityProfileDto = undefined;
  identity?: IdentityDto = undefined;

  constructor(
    private readonly storageService: StorageService
  ) {
    const identity = this.storageService.get(APP_TOKEN_KEY);
    if (identity) {
      this.identity = JSON.parse(identity);
    }
  }
}
