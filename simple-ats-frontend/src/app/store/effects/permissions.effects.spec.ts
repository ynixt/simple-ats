import { createServiceFactory, mockProvider, SpectatorService, SpyObject } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';

import { permissionsMock } from 'src/app/core/models/mock';
import { PermissionsService } from 'src/app/core/permissions.service';
import { PermissionsActions } from '../actions';
import { PermissionsEffects } from './permissions.effects';

describe('PermissionsEffects', () => {
  let service: PermissionsEffects;
  let spectator: SpectatorService<PermissionsEffects>;
  let actions$: Observable<any>;

  const createService = createServiceFactory({
    service: PermissionsEffects,
    providers: [provideMockActions(() => actions$), ...provideMockStore({}), mockProvider(PermissionsService)],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPermissions$', () => {
    let permissionsService: SpyObject<PermissionsService>;

    beforeEach(() => {
      permissionsService = spectator.inject(PermissionsService);
    });

    it('without error', done => {
      const permissions = permissionsMock();

      actions$ = of(PermissionsActions.getPermissions);
      permissionsService.getPermissions.and.callFake(async () => permissions);

      const subscription = service.getPermissions$.subscribe(action => {
        expect(action).toEqual(PermissionsActions.getPermissionsSuccess({ permissions }));
        subscription.unsubscribe();
        done();
      });
    });

    it('with error', done => {
      const error = 'err';

      actions$ = of(PermissionsActions.getPermissions);
      permissionsService.getPermissions.and.rejectWith(error);

      const subscription = service.getPermissions$.subscribe(action => {
        expect(action).toEqual(PermissionsActions.getPermissionsError({ error }));
        subscription.unsubscribe();
        done();
      });
    });
  });
});
