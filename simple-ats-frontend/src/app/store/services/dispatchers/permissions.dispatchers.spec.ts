import { TestBed } from '@angular/core/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Store, StoreModule } from '@ngrx/store';

import { PermissionsActions } from '../../actions';
import { EntityState } from '../../reducers';
import { PermissionDispatchers } from './permissions.dispatchers';

describe('PermissionDispatchers', () => {
  let service: PermissionDispatchers;
  let spectator: SpectatorService<PermissionDispatchers>;
  let store: Store<EntityState>;

  const createService = createServiceFactory({
    service: PermissionDispatchers,
    imports: [StoreModule.forRoot({})],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.stub();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPermissions', () => {
    service.getPermissions();

    expect(store.dispatch).toHaveBeenCalledWith(PermissionsActions.getPermissions());
  });
});
