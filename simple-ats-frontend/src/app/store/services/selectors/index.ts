import { AuthSelectors } from './auth.selectors';
import { PermissionsSelectors } from './permissions.selectors';

export * from './auth.selectors';
export * from './permissions.selectors';

export const selectors = [AuthSelectors, PermissionsSelectors];
