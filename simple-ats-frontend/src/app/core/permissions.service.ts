import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Permission } from './models';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private httpClient: HttpClient) {}

  public async getPermissions(): Promise<Permission[]> {
    return this.httpClient.get<Permission[]>('/api/permission').toPromise();
  }
}
