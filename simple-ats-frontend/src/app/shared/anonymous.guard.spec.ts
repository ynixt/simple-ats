import { Router } from '@angular/router';
import { createServiceFactory, mockProvider, SpectatorService, SpyObject } from '@ngneat/spectator';

import { AuthSelectors } from '../store/services/selectors';
import { AnonymousGuard } from './anonymous.guard';

describe('AnonymousGuard', () => {
  let guard: AnonymousGuard;
  let spectator: SpectatorService<AnonymousGuard>;

  const createService = createServiceFactory({
    service: AnonymousGuard,
    providers: [mockProvider(AuthSelectors), mockProvider(Router)],
  });

  beforeEach(() => {
    spectator = createService();
    guard = spectator.service;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    let authSelectors: SpyObject<AuthSelectors>;
    let router: SpyObject<Router>;

    beforeEach(() => {
      authSelectors = spectator.inject(AuthSelectors);
      router = spectator.inject(Router);

      router.navigateByUrl.and.stub();
    });

    it('when is logged must redirect to home and return false', async () => {
      authSelectors.nextIsLogged.andCallFake(async () => true);

      const canActivate = await guard.canActivate();

      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
      expect(canActivate).toBeFalse();
    });

    it('when is not logged return true', async () => {
      authSelectors.nextIsLogged.andCallFake(async () => false);

      const canActivate = await guard.canActivate();

      expect(router.navigateByUrl).not.toHaveBeenCalled();
      expect(canActivate).toBeTrue();
    });
  });

  it('canActivateChild', () => {
    const promise = Promise.resolve(true);
    spyOn(guard, 'canActivate').and.returnValue(promise);

    expect(guard.canActivateChild()).toBe(promise);
    expect(guard.canActivate).toHaveBeenCalled();
  });
});
