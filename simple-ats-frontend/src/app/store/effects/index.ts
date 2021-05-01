import { AuthEffects } from './auth.effects';
import { PermissionsEffects } from './permissions.effects';

export * from './auth.effects';
export * from './permissions.effects';

export const effects: any[] = [AuthEffects, PermissionsEffects];
