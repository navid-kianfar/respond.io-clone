import {Injectable} from '@angular/core';
import {OperationResult, OperationResultStatus} from "../../lib/operation-result";
import {IdentityProfileDto, IdentitySigninDto} from "../../dtos/account-dtos";
import {HttpService} from "../core/http.service";
import {AppStateService} from "../core/app-state.service";
import {StorageService} from "../core/storage.service";
import {APP_TOKEN_KEY} from "../../lib/constsnts";

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  constructor(
    private readonly httpService: HttpService,
    private readonly appState: AppStateService,
    private readonly storageService: StorageService,
  ) { }

  logout() {

  }

  async load(): Promise<OperationResult<IdentityProfileDto>> {
    if (this.appState.identity?.token) {
      const op = await this.httpService.get<IdentityProfileDto>('/account/profile');
      if (op.status === OperationResultStatus.success) {
        this.appState.profile = op.data;
      } else {
        this.logout();
      }
      return op;
    }
    return OperationResult.Success<IdentityProfileDto>(undefined);
  }

  async signin(model: any): Promise<OperationResult<IdentitySigninDto>> {
    const op = await this.httpService.post<IdentitySigninDto>('/account/signin', model);
    if (op.status === OperationResultStatus.success) {
      this.appState.identity = op.data;
      this.storageService.set(APP_TOKEN_KEY, this.appState.identity);
    }
    return OperationResult.Failed<IdentitySigninDto>(undefined);
  }
}
