import { TestBed } from '@angular/core/testing';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator';
import { Store, StoreModule } from '@ngrx/store';

import { userMock } from 'src/app/core/models/mock';
import { TokenService } from 'src/app/core/token.service';
import { AuthActions } from '../../actions';
import { EntityState } from '../../reducers';
import { AuthDispatchers } from './auth.dispatchers';

describe('AuthDispatchers', () => {
  let service: AuthDispatchers;
  let spectator: SpectatorService<AuthDispatchers>;
  let store: Store<EntityState>;

  const createService = createServiceFactory({
    service: AuthDispatchers,
    imports: [StoreModule.forRoot({})],
    providers: [mockProvider(TokenService)],
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

  it('login', () => {
    const email = 'a@a.c';
    const password = '123';

    service.login(email, password);

    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.login({ email, password }));
  });

  it('loginByStorage', () => {
    const tokenService = spectator.inject(TokenService);
    const token = 't';
    const user = userMock();

    tokenService.getToken.andReturn(token);
    tokenService.getUserFromToken.andReturn(user);

    service.loginByStorage();

    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.authSuccess({ user }));
    expect(tokenService.getToken).toHaveBeenCalled();
    expect(tokenService.getUserFromToken).toHaveBeenCalledWith(token);
  });

  it('logout', () => {
    const tokenService = spectator.inject(TokenService);

    tokenService.deleteToken.and.stub();

    service.logout();

    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.authSuccess({ user: null }));
    expect(tokenService.deleteToken).toHaveBeenCalled();
  });
});
