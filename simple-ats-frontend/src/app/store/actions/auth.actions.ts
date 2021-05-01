import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/models';

export const login = createAction('[Auth] LOGIN', props<{ email: string; password: string }>());
export const checkIfIsLogged = createAction('[Auth] CHECK_IF_IS_LOGGED');
export const authError = createAction('[Auth] AUTH_ERROR', props<{ error: any }>());
export const authSuccess = createAction('[Auth] AUTH_SUCCESS', props<{ user: User }>());
