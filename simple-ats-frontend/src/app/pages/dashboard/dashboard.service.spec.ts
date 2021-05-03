import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator';
import { ApiService } from 'src/app/core/api.service';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let spectator: SpectatorService<DashboardService>;

  const createService = createServiceFactory({
    service: DashboardService,
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
