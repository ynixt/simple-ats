import { ActionReducerMap } from '@ngrx/store';
import * as AuthReducer from './auth.reducer';
import * as PermissionsReducer from './permissions.reducer';

export { AuthReducer, PermissionsReducer };

export interface EntityState {
  auth: AuthReducer.AuthState;
  permissions: PermissionsReducer.PermissionState;
}

export const reducers: ActionReducerMap<EntityState> = {
  auth: AuthReducer.reducer,
  permissions: PermissionsReducer.reducer,
};
