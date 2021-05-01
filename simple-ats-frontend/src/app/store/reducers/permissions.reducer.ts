import { createReducer, Action, on, ActionReducer } from '@ngrx/store';
import { Permission } from 'src/app/core/models';
import { PermissionsActions } from '../actions';

export type PermissionState = {
  loading: boolean;
  error?: any;
  permissions?: Permission[];
};

export const initialState: PermissionState = {
  loading: false,
};

const permissionsReducer: ActionReducer<PermissionState, Action> = createReducer(
  initialState,
  on(PermissionsActions.getPermissions, _ => {
    return {
      ...initialState,
      loading: true,
    };
  }),
  on(PermissionsActions.getPermissionsSuccess, (_, action) => {
    return {
      ...initialState,
      permissions: action.permissions,
    };
  }),
  on(PermissionsActions.getPermissionsError, (_, action) => {
    return {
      ...initialState,
      error: action.error,
    };
  }),
);

export function reducer(state: PermissionState, action: Action): PermissionState {
  return permissionsReducer(state, action);
}
