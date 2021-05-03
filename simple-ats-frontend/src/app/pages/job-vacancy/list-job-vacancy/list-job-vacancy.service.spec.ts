import { createServiceFactory, mockProvider, SpectatorService, SpyObject } from '@ngneat/spectator';

import { ApiService } from 'src/app/core/api.service';
import { ListJobVacancyService } from './list-job-vacancy.service';

describe('ListJobVacancyService', () => {
  let service: ListJobVacancyService;
  let spectator: SpectatorService<ListJobVacancyService>;

  const createService = createServiceFactory({
    service: ListJobVacancyService,
    providers: [mockProvider(ApiService)],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('list', () => {
    let apiService: SpyObject<ApiService>;

    beforeEach(() => {
      apiService = spectator.inject(ApiService);
      apiService.get.andCallFake(() => Promise.resolve(null));
    });

    it('no args', () => {
      service.list();

      expect(apiService.get).toHaveBeenCalledWith('/api/jobs', { params: {} });
    });

    it('with name', () => {
      const name = 't';

      service.list({
        name,
      });

      expect(apiService.get).toHaveBeenCalledWith('/api/jobs', { params: { name } });
    });

    it('with page', () => {
      const page = 5;

      service.list({
        qPage: {
          page,
        },
      });

      expect(apiService.get).toHaveBeenCalledWith('/api/jobs', { params: { page } });
    });

    it('with pageSize', () => {
      const pageSize = 5;

      service.list({
        qPage: {
          pageSize,
        },
      });

      expect(apiService.get).toHaveBeenCalledWith('/api/jobs', { params: { pageSize } });
    });
  });
});
