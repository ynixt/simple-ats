import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { createServiceFactory, mockProvider, SpectatorService, SpyObject } from '@ngneat/spectator';
import { permissionsMock } from '../core/models/mock';
import { PermissionsSelectors } from '../store/services/selectors';

import { PermissionGuard } from './permission.guard';

describe('PermissionGuard', () => {
  let guard: PermissionGuard;
  let spectator: SpectatorService<PermissionGuard>;

  const createService = createServiceFactory({
    service: PermissionGuard,
    providers: [mockProvider(PermissionsSelectors), mockProvider(Router)],
  });

  beforeEach(() => {
    spectator = createService();
    guard = spectator.service;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    let permissionsSelectors: SpyObject<PermissionsSelectors>;
    let router: SpyObject<Router>;

    beforeEach(() => {
      permissionsSelectors = spectator.inject(PermissionsSelectors);
      router = spectator.inject(Router);

      router.navigateByUrl.and.stub();
    });

    describe('with permissions', () => {
      beforeEach(() => {
        permissionsSelectors.nextPermissions.andCallFake(async () => permissionsMock());
      });

      it('without route in map', async () => {
        const route = new ActivatedRouteSnapshot();
        route.url = [
          {
            path: 'aa',
            parameterMap: null,
            parameters: null,
          },
        ];
        expect(await guard.canActivate(route)).toBeTrue();
      });
    });

    it('without permissions', async () => {
      const route = new ActivatedRouteSnapshot();
      route.url = [
        {
          path: 'aa',
          parameterMap: null,
          parameters: null,
        },
      ];

      permissionsSelectors.nextPermissions.andReturn(Promise.resolve(undefined));

      expect(await guard.canActivate(route)).toBeFalse();
    });
  });

  it('canActivateChild', () => {
    const route = new ActivatedRouteSnapshot();
    route.url = [
      {
        path: 'aa',
        parameterMap: null,
        parameters: null,
      },
    ];

    spyOn(guard, 'canActivate').and.stub();

    guard.canActivateChild(route);

    expect(guard.canActivate).toHaveBeenCalledWith(route);
  });
});
