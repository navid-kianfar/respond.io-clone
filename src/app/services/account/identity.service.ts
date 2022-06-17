import {Injectable} from '@angular/core';
import {OperationResult, OperationResultStatus} from "../../lib/operation-result";
import {IdentityProfileDto} from "../../dtos/account-dtos";
import {HttpService} from "../core/http.service";
import {AppStateService} from "../core/app-state.service";

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  constructor(
    private readonly httpService: HttpService,
    private readonly appState: AppStateService,
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
}
