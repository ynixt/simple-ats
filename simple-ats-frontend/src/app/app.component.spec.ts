import { Spectator, SpyObject, createComponentFactory, mockProvider } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';

import { AppComponent } from './app.component';
import { PermissionDispatchers, AuthDispatchers } from './store';

describe('AppComponent', () => {
  let component: AppComponent;
  let spectator: Spectator<AppComponent>;

  let authDispatchers: SpyObject<AuthDispatchers>;
  let permissionDispatchers: SpyObject<PermissionDispatchers>;

  const createComponent = createComponentFactory<AppComponent>({
    component: AppComponent,
    providers: [...provideMockStore(), mockProvider(PermissionDispatchers), mockProvider(AuthDispatchers)],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    authDispatchers = spectator.inject(AuthDispatchers);
    permissionDispatchers = spectator.inject(PermissionDispatchers);

    authDispatchers.loginByStorage.and.stub();
    permissionDispatchers.getPermissions.and.stub();

    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    expect(authDispatchers.loginByStorage).toHaveBeenCalled();
    expect(permissionDispatchers.getPermissions).toHaveBeenCalled();
  });
});
