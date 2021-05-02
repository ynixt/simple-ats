import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { Permission } from './models';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private apiService: ApiService, private tokenService: TokenService) {}

  public async getPermissions(): Promise<Permission[]> {
    if (this.tokenService.tokenIsSaved()) {
      return this.apiService.get<Permission[]>('/api/permission');
    }

    return null;
  }
}
