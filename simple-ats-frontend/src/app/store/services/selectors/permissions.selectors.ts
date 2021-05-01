import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';
import { Permission } from 'src/app/core/models';
import { EntityState } from '../../reducers';
import { PermissionState } from '../../reducers/permissions.reducer';

const loggedSelector = createFeatureSelector<PermissionState>('permissions');

export const getPermissionsState = createSelector(loggedSelector, (state: PermissionState) => state);

@Injectable()
export class PermissionsSelectors {
  constructor(private store: Store<EntityState>) {}

  state$ = this.store.select(getPermissionsState);

  public nextPermissions(): Promise<Permission[]> {
    return new Promise<Permission[]>(resolve => {
      this.state$
        .pipe(filter(state => state.permissions || state.error))
        .pipe(take(1))
        .subscribe(state => {
          resolve(state.permissions);
        });
    });
  }
}
