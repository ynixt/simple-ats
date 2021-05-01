import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { createServiceFactory, mockProvider, SpectatorService, SpyObject } from '@ngneat/spectator';
import { BehaviorSubject } from 'rxjs';
import { AuthDispatchers, PermissionDispatchers } from '../store';

import { AuthService } from './auth.service';
import { loginResponseMock, userMock } from './models/mock';
import { TokenService } from './token.service';

describe('AuthService', () => {
  let service: AuthService;
  let spectator: SpectatorService<AuthService>;

  const createService = createServiceFactory({
    service: AuthService,
    providers: [
      mockProvider(HttpClient),
      mockProvider(TokenService),
      mockProvider(AuthDispatchers),
      mockProvider(PermissionDispatchers),
      mockProvider(Router),
    ],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login', async () => {
    const httpClient = spectator.inject(HttpClient);
    const tokenService = spectator.inject(TokenService);
    const permissionDispatchers = spectator.inject(PermissionDispatchers);
    const router = spectator.inject(Router);

    const loginResponse = loginResponseMock();
    const user = userMock();

    const postSubject = new BehaviorSubject(loginResponse);
    const email = 'a@a.com';
    const password = '123';

    httpClient.post.and.callFake(() => postSubject.asObservable());
    tokenService.getUserFromToken.and.returnValue(user);

    const userReturned = await service.login(email, password);

    expect(httpClient.post).toHaveBeenCalledOnceWith('/api/auth/login', undefined, {
      headers: jasmine.any(HttpHeaders),
    });

    expect(tokenService.setToken).toHaveBeenCalledOnceWith(loginResponse.token);
    expect(permissionDispatchers.getPermissions).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/');
    expect(tokenService.getUserFromToken).toHaveBeenCalledOnceWith(loginResponse.token);
    expect(userReturned).toEqual(user);
  });

  it('logout', () => {
    const authDispatchers = spectator.inject(AuthDispatchers);

    authDispatchers.logout.and.stub();

    service.logout();

    expect(authDispatchers.logout).toHaveBeenCalled();
  });

  describe('getCurrentUser', () => {
    let tokenService: SpyObject<TokenService>;

    beforeEach(() => {
      tokenService = spectator.inject(TokenService);
    });

    it('with token not null must get from getUserFromToken', () => {
      const token = 'uu';
      const user = userMock();

      tokenService.getToken.andReturn(token);
      tokenService.getUserFromToken.andReturn(user);

      const userReturned = service.getCurrentUser();

      expect(tokenService.getUserFromToken).toHaveBeenCalledOnceWith(token);
      expect(userReturned).toEqual(user);
    });

    it('with token null must return undefined', () => {
      const token: undefined = undefined;

      tokenService.getToken.andReturn(token);
      tokenService.getUserFromToken.and.stub();

      const userReturned = service.getCurrentUser();

      expect(tokenService.getUserFromToken).not.toHaveBeenCalled();
      expect(userReturned).toBeUndefined();
    });
  });
});
