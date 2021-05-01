import { createReducer, Action, on, ActionReducer } from '@ngrx/store';
import { User } from 'src/app/core/models';
import { AuthActions } from '../actions';

export type AuthState = {
  loading: boolean;
  error?: any;
  user?: User | null;
};

export const initialState: AuthState = {
  loading: false,
};

const loggedReducer: ActionReducer<AuthState, Action> = createReducer(
  initialState,
  on(AuthActions.login, _ => {
    return {
      ...initialState,
      loading: true,
    };
  }),
  on(AuthActions.authSuccess, (_, action) => {
    return {
      ...initialState,
      user: action.user,
    };
  }),
  on(AuthActions.authError, (_, action) => {
    return {
      ...initialState,
      error: action.error,
    };
  }),
);

export function reducer(state: AuthState | undefined, action: Action): AuthState {
  return loggedReducer(state, action);
}
