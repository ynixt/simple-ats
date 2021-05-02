import { TestBed } from '@angular/core/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Store, StoreModule } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

import { EntityState } from '../../reducers';
import { AuthSelectors } from './auth.selectors';
import { AuthReducer } from '../../reducers';
import { userMock } from 'src/app/core/models/mock';

describe('AuthSelectors', () => {
  let service: AuthSelectors;
  let spectator: SpectatorService<AuthSelectors>;
  let store: Store<EntityState>;

  const createService = createServiceFactory({
    service: AuthSelectors,
    imports: [StoreModule.forRoot({})],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('nextIsLogged', done => {
    const subject = new BehaviorSubject(AuthReducer.initialState);

    const state: AuthReducer.AuthState = {
      user: userMock(),
      loading: false,
    };

    service.state$ = subject.asObservable();

    service.nextIsLogged().then(isLogged => {
      expect(isLogged).toBeTrue();

      subject.complete();

      done();
    });

    subject.next(state);
  });
});
