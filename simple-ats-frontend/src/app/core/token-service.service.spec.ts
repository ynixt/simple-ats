import { JwtHelperService } from '@auth0/angular-jwt';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;
  let spectator: SpectatorService<TokenService>;

  const createService = createServiceFactory({
    service: TokenService,
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setToken', () => {
    const token = 'tt';

    spyOn(localStorage, 'setItem').and.stub();

    service.setToken(token);

    expect(localStorage.setItem).toHaveBeenCalledWith(service['tokenKey'], token);
  });

  it('deleteToken', () => {
    spyOn(localStorage, 'removeItem').and.stub();

    service.deleteToken();

    expect(localStorage.removeItem).toHaveBeenCalledWith(service['tokenKey']);
  });

  it('getToken', () => {
    const token = 'tt';

    spyOn(localStorage, 'getItem').and.returnValue(token);

    expect(service.getToken()).toBe(token);

    expect(localStorage.getItem).toHaveBeenCalledWith(service['tokenKey']);
  });

  describe('getUserFromToken', () => {
    it('when token is null must return undefined', () => {
      expect(service.getUserFromToken(null)).toBeUndefined();
    });

    it('when token is not null must decode and return user', () => {
      const token = 'uu';
      const decodedToken = {
        nameid: 5,
        unique_name: 'a@a.c',
        given_name: 'or',
      };

      spyOn<any>(JwtHelperService.prototype, 'decodeToken').and.returnValue(decodedToken);

      expect(service.getUserFromToken(token)).toEqual({
        id: decodedToken.nameid,
        email: decodedToken.unique_name,
        name: decodedToken.given_name,
      });
    });
  });

  it('tokenIsSaved', () => {
    const token = 'tt';

    spyOn(localStorage, 'getItem').and.returnValue(token);

    expect(service.tokenIsSaved()).toBeTrue();
    expect(localStorage.getItem).toHaveBeenCalledWith(service['tokenKey']);
  });
});
