import { HttpClient } from '@angular/common/http';
import { createServiceFactory, mockProvider, SpectatorService, SpyObject } from '@ngneat/spectator';
import { of } from 'rxjs';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let spectator: SpectatorService<ApiService>;

  let httpClient: SpyObject<HttpClient>;

  const createService = createServiceFactory({
    service: ApiService,
    providers: [mockProvider(HttpClient)],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;

    httpClient = spectator.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('post', async () => {
    const fakeResponse = 'asd';
    const url = '/test';
    const body = 'bb';

    httpClient.post.and.callFake(() => of(fakeResponse));

    const response = await service.post<string, string>(url, body);

    expect(response).toEqual(fakeResponse);
    expect(httpClient.post).toHaveBeenCalledWith(url, body, undefined);
  });

  it('get', async () => {
    const fakeResponse = 'asd';
    const url = '/test';

    httpClient.get.and.callFake(() => of(fakeResponse));

    const response = await service.get<string>(url);

    expect(response).toEqual(fakeResponse);
    expect(httpClient.get).toHaveBeenCalledWith(url, undefined);
  });
});
