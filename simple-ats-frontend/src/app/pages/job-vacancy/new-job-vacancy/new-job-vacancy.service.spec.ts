import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator';
import { ApiService } from 'src/app/core/api.service';

import { NewJobVacancyService } from './new-job-vacancy.service';

describe('NewJobVacancyService', () => {
  let service: NewJobVacancyService;
  let spectator: SpectatorService<NewJobVacancyService>;

  const createService = createServiceFactory({
    service: NewJobVacancyService,
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
