import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Permission } from './models';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private httpClient: HttpClient, private tokenService: TokenService) {}

  public async getPermissions(): Promise<Permission[]> {
    if (this.tokenService.tokenIsSaved()) {
      return this.httpClient.get<Permission[]>('/api/permission').toPromise();
    }

    return null;
  }
}
