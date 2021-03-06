import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator';
import { ApiService } from 'src/app/core/api.service';

import { ViewJobVacancyService } from './view-job-vacancy.service';

describe('ViewJobVacancyService', () => {
  let service: ViewJobVacancyService;
  let spectator: SpectatorService<ViewJobVacancyService>;

  const createService = createServiceFactory({
    service: ViewJobVacancyService,
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
