import { createServiceFactory, mockProvider, SpectatorService, SpyObject } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';

import { AuthService } from 'src/app/core/auth.service';
import { userMock } from 'src/app/core/models/mock';
import { AuthActions } from '../actions';
import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let service: AuthEffects;
  let spectator: SpectatorService<AuthEffects>;
  let actions$: Observable<any>;

  const createService = createServiceFactory({
    service: AuthEffects,
    providers: [provideMockActions(() => actions$), ...provideMockStore({}), mockProvider(AuthService)],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login$', () => {
    let authService: SpyObject<AuthService>;

    beforeEach(() => {
      authService = spectator.inject(AuthService);
    });

    it('without error', done => {
      const user = userMock();

      actions$ = of(AuthActions.login);
      authService.login.and.callFake(async () => user);

      const subscription = service.login$.subscribe(action => {
        expect(action).toEqual(AuthActions.authSuccess({ user }));
        subscription.unsubscribe();
        done();
      });
    });

    it('with error', done => {
      const error = 'err';

      actions$ = of(AuthActions.login);
      authService.login.and.rejectWith(error);

      const subscription = service.login$.subscribe(action => {
        expect(action).toEqual(AuthActions.authError({ error }));
        subscription.unsubscribe();
        done();
      });
    });
  });
});
