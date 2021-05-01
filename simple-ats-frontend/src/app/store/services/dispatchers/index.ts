import { AuthDispatchers } from './auth.dispatchers';
import { PermissionDispatchers } from './permissions.dispatchers';

export * from './auth.dispatchers';
export * from './permissions.dispatchers';

export const dispatchers = [AuthDispatchers, PermissionDispatchers];
