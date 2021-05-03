import { SpectatorService, createServiceFactory, mockProvider } from '@ngneat/spectator';
import { ApiService } from 'src/app/core/api.service';

import { CandidatesService } from './candidates.service';

describe('CandidatesService', () => {
  let service: CandidatesService;
  let spectator: SpectatorService<CandidatesService>;

  const createService = createServiceFactory({
    service: CandidatesService,
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
