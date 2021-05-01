import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { PermissionsActions } from '../../actions';
import { EntityState } from '../../reducers';

@Injectable()
export class PermissionDispatchers {
  constructor(private store: Store<EntityState>) {}

  public getPermissions(): void {
    this.store.dispatch(PermissionsActions.getPermissions());
  }
}
