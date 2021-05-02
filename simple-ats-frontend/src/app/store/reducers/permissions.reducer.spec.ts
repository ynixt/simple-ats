import { permissionsMock } from 'src/app/core/models/mock';
import { PermissionsActions } from '../actions';
import { PermissionsReducer } from '.';

describe('AuthReducer action', () => {
  it('initialState', () => {
    const { initialState } = PermissionsReducer;

    expect(initialState.loading).toBeFalse();
    expect(initialState.permissions).toBeUndefined();
    expect(initialState.error).toBeUndefined();
  });

  it('login action', () => {
    const { initialState } = PermissionsReducer;

    const action = PermissionsActions.getPermissions();
    const state = PermissionsReducer.reducer(initialState, action);

    expect(state.loading).toBeTrue();
    expect(state.permissions).toBeUndefined();
    expect(state.error).toBeUndefined();
  });

  it('authSuccess action', () => {
    const { initialState } = PermissionsReducer;
    const permissions = permissionsMock();

    const action = PermissionsActions.getPermissionsSuccess({ permissions });
    const state = PermissionsReducer.reducer(initialState, action);

    expect(state.loading).toBeFalse();
    expect(state.permissions).toEqual(permissions);
    expect(state.error).toBeUndefined();
  });

  it('authError action', () => {
    const { initialState } = PermissionsReducer;
    const error = 'err';

    const action = PermissionsActions.getPermissionsError({ error });
    const state = PermissionsReducer.reducer(initialState, action);

    expect(state.loading).toBeFalse();
    expect(state.error).toEqual(error);
    expect(state.permissions).toBeUndefined();
  });
});
