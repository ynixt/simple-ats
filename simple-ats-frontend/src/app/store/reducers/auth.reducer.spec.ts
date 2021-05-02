import { userMock } from 'src/app/core/models/mock';
import { AuthActions } from '../actions';
import { AuthReducer } from './';

describe('AuthReducer action', () => {
  it('initialState', () => {
    const { initialState } = AuthReducer;

    expect(initialState.loading).toBeFalse();
    expect(initialState.user).toBeUndefined();
    expect(initialState.error).toBeUndefined();
  });

  it('login action', () => {
    const { initialState } = AuthReducer;
    const email = 'a@a.c';
    const password = '123';

    const action = AuthActions.login({ email, password });
    const state = AuthReducer.reducer(initialState, action);

    expect(state.loading).toBeTrue();
    expect(state.user).toBeUndefined();
    expect(state.error).toBeUndefined();
  });

  it('authSuccess action', () => {
    const { initialState } = AuthReducer;
    const user = userMock();

    const action = AuthActions.authSuccess({ user });
    const state = AuthReducer.reducer(initialState, action);

    expect(state.loading).toBeFalse();
    expect(state.user).toEqual(user);
    expect(state.error).toBeUndefined();
  });

  it('authError action', () => {
    const { initialState } = AuthReducer;
    const error = 'err';

    const action = AuthActions.authError({ error });
    const state = AuthReducer.reducer(initialState, action);

    expect(state.loading).toBeFalse();
    expect(state.error).toEqual(error);
    expect(state.user).toBeUndefined();
  });
});
