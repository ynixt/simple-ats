import { createAction, props } from '@ngrx/store';
import { Permission } from 'src/app/core/models';

export const getPermissions = createAction('[Permissions] GET');
export const getPermissionsError = createAction('[Permissions] ERROR', props<{ error: any }>());
export const getPermissionsSuccess = createAction('[Permissions] SUCCESS', props<{ permissions: Permission[] }>());
