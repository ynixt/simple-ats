import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject } from 'rxjs';

import { TranslateService } from './translate.service';

describe('TranslateService', () => {
  let service: TranslateService;
  let spectator: SpectatorService<TranslateService>;

  const createService = createServiceFactory({
    service: TranslateService,
    providers: [mockProvider(TranslocoService)],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('translate', async () => {
    const translocoService = spectator.inject(TranslocoService);
    translocoService.selectTranslate.and.callFake(key => new BehaviorSubject('tt' + key).asObservable());

    const translated = await service.translate('teste');

    expect(translated).toBe('tt' + 'teste');
  });
});
