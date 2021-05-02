import { TestBed } from '@angular/core/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Store, StoreModule } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

import { EntityState } from '../../reducers';
import { PermissionsReducer } from '../../reducers';
import { permissionsMock } from 'src/app/core/models/mock';
import { PermissionsSelectors } from './permissions.selectors';

describe('PermissionsSelectors', () => {
  let service: PermissionsSelectors;
  let spectator: SpectatorService<PermissionsSelectors>;
  let store: Store<EntityState>;

  const createService = createServiceFactory({
    service: PermissionsSelectors,
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
    const subject = new BehaviorSubject(PermissionsReducer.initialState);

    const state: PermissionsReducer.PermissionState = {
      permissions: permissionsMock(),
      loading: false,
    };

    service.state$ = subject.asObservable();

    service.nextPermissions().then(permissions => {
      expect(permissions).toBe(state.permissions);

      subject.complete();

      done();
    });

    subject.next(state);
  });
});
