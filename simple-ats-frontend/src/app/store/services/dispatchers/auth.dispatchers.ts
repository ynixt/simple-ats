import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthActions } from '../../actions';
import { EntityState } from '../../reducers';

@Injectable()
export class AuthDispatchers {
  constructor(private store: Store<EntityState>) {}

  public login(email: string, password: string): void {
    this.store.dispatch(AuthActions.login({ email, password }));
  }
}
