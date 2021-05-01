import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TokenService } from 'src/app/core/token.service';

import { AuthActions } from '../../actions';
import { EntityState } from '../../reducers';

@Injectable()
export class AuthDispatchers {
  constructor(private store: Store<EntityState>, private tokenService: TokenService) {}

  public login(email: string, password: string): void {
    this.store.dispatch(AuthActions.login({ email, password }));
  }

  public loginByStorage(): void {
    const token = this.tokenService.getToken();
    const user = this.tokenService.getUserFromToken(token);

    this.store.dispatch(AuthActions.authSuccess({ user: user }));
  }

  public logout(): void {
    this.tokenService.deleteToken();
    this.store.dispatch(AuthActions.authSuccess({ user: undefined }));
  }
}
