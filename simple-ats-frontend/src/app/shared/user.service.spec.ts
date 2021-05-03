import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator';
import { ApiService } from 'src/app/core/api.service';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let spectator: SpectatorService<UserService>;

  const createService = createServiceFactory({
    service: UserService,
    providers: [mockProvider(ApiService)],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
