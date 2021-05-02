import { HttpErrorResponse } from '@angular/common/http';
import { fakeAsync, tick } from '@angular/core/testing';
import { Spectator, SpyObject, createComponentFactory, mockProvider } from '@ngneat/spectator';
import { TranslocoService } from '@ngneat/transloco';
import { provideMockStore } from '@ngrx/store/testing';
import { PoNotificationService } from '@po-ui/ng-components';
import { BehaviorSubject, Subject } from 'rxjs';

import { TestUnsubscribeOnMethod } from 'src/test.commom.spec';
import { AppComponent } from './app.component';
import { TokenService } from './core/token.service';
import { PermissionDispatchers, AuthDispatchers } from './store';
import { PermissionState } from './store/reducers/permissions.reducer';
import { PermissionsSelectors } from './store/services/selectors';

describe('AppComponent', () => {
  let component: AppComponent;
  let spectator: Spectator<AppComponent>;

  let translocoService: SpyObject<TranslocoService>;
  let authDispatchers: SpyObject<AuthDispatchers>;
  let tokenService: SpyObject<TokenService>;
  let permissionDispatchers: SpyObject<PermissionDispatchers>;
  let poNotificationService: SpyObject<PoNotificationService>;

  const permissionsStateSubject = new Subject<PermissionState>();

  const createComponent = createComponentFactory<AppComponent>({
    component: AppComponent,
    providers: [
      ...provideMockStore(),
      mockProvider(PermissionDispatchers),
      mockProvider(PermissionsSelectors, { state$: permissionsStateSubject.asObservable() }),
      mockProvider(TranslocoService),
      mockProvider(AuthDispatchers),
      mockProvider(TokenService),
      mockProvider(PoNotificationService),
    ],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    translocoService = spectator.inject(TranslocoService);
    authDispatchers = spectator.inject(AuthDispatchers);
    tokenService = spectator.inject(TokenService);
    permissionDispatchers = spectator.inject(PermissionDispatchers);
    poNotificationService = spectator.inject(PoNotificationService);

    translocoService.translate.and.callFake(key => key);
    translocoService.selectTranslate.and.callFake(key => new BehaviorSubject(key).asObservable());
    authDispatchers.loginByStorage.and.stub();
    tokenService.tokenIsSaved.andReturn(true);
    permissionDispatchers.getPermissions.and.stub();
    poNotificationService.error.and.stub();

    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    expect(authDispatchers.loginByStorage).toHaveBeenCalled();
    expect(tokenService.tokenIsSaved).toHaveBeenCalled();
    expect(permissionDispatchers.getPermissions).toHaveBeenCalled();
  });

  it('permissionsSelectors.state$ with 401 error', fakeAsync(() => {
    permissionsStateSubject.next({
      loading: false,
      error: new HttpErrorResponse({ status: 401 }),
    });

    tick();

    expect(poNotificationService.error).toHaveBeenCalledWith('sessionExpired');
    expect(translocoService.selectTranslate).toHaveBeenCalledWith('sessionExpired');
  }));

  it('ngOnDestroy', () => {
    TestUnsubscribeOnMethod(component, 'permissionsSubscription', 'ngOnDestroy');
  });
});
