import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

import { PermissionsService } from './permissions.service';
import { TokenService } from './token.service';

describe('PermissionsService', () => {
  let service: PermissionsService;
  let spectator: SpectatorService<PermissionsService>;

  const createService = createServiceFactory({
    service: PermissionsService,
    providers: [mockProvider(ApiService), mockProvider(TokenService)],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPermissions', () => {
    const apiService = spectator.inject(ApiService);
    const tokenService = spectator.inject(TokenService);

    const subject = new BehaviorSubject(null);

    apiService.get.andReturn(subject.asObservable());
    tokenService.tokenIsSaved.andReturn(true);

    service.getPermissions();

    expect(apiService.get).toHaveBeenCalledOnceWith('/api/permission');
  });
});
