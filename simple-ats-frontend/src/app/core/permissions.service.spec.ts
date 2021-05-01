import { HttpClient } from '@angular/common/http';
import { createServiceFactory, mockProvider, SpectatorService, SpyObject } from '@ngneat/spectator';
import { BehaviorSubject } from 'rxjs';

import { PermissionsService } from './permissions.service';

describe('PermissionsService', () => {
  let service: PermissionsService;
  let spectator: SpectatorService<PermissionsService>;

  const createService = createServiceFactory({
    service: PermissionsService,
    providers: [mockProvider(HttpClient)],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPermissions', () => {
    const httpClient = spectator.inject(HttpClient);
    const subject = new BehaviorSubject(null);

    httpClient.get.andReturn(subject.asObservable());

    service.getPermissions();

    expect(httpClient.get).toHaveBeenCalledOnceWith('/api/permission');
  });
});
