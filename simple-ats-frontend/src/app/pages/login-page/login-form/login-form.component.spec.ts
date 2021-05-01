import { HttpErrorResponse } from '@angular/common/http';
import { fakeAsync, tick } from '@angular/core/testing';
import { createComponentFactory, mockProvider, Spectator, SpyObject } from '@ngneat/spectator';
import { TranslocoService } from '@ngneat/transloco';
import { PoLoadingOverlayComponent, PoNotificationService } from '@po-ui/ng-components';
import { PoPageLogin, PoPageLoginComponent } from '@po-ui/ng-templates';
import { MockComponents } from 'ng-mocks';
import { Subject } from 'rxjs';

import { AuthDispatchers } from 'src/app/store';
import { AuthSelectors } from 'src/app/store/services/selectors';
import { TestUnsubscribeOnMethod } from 'src/test.commom.spec';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let spectator: Spectator<LoginFormComponent>;
  let translocoService: SpyObject<TranslocoService>;

  const errorSubject = new Subject<any>();

  const createComponent = createComponentFactory<LoginFormComponent>({
    component: LoginFormComponent,
    declarations: [MockComponents(PoPageLoginComponent, PoLoadingOverlayComponent)],
    providers: [
      mockProvider(AuthDispatchers),
      mockProvider(AuthSelectors, { error$: errorSubject.asObservable() }),
      mockProvider(PoNotificationService),
      mockProvider(TranslocoService),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    translocoService = spectator.inject(TranslocoService);

    translocoService.translate.and.callFake(key => key);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showError', fakeAsync(() => {
    const poNotificationService = spectator.inject(PoNotificationService);

    errorSubject.next(new HttpErrorResponse({ status: 401 }));

    tick();

    expect(poNotificationService.error).toHaveBeenCalledWith('login.invalidCredentials');
    expect(translocoService.translate).toHaveBeenCalledWith('login.invalidCredentials');
  }));

  it('ngOnDestroy', () => {
    TestUnsubscribeOnMethod(component, 'errorSubscription', 'ngOnDestroy');
  });

  it('login', () => {
    const authDispatchers = spectator.inject(AuthDispatchers);
    const poLogin: PoPageLogin = {
      login: 'tt',
      password: 'bb',
      rememberUser: false,
    };

    authDispatchers.login.and.stub();

    component.login(poLogin);

    expect(authDispatchers.login).toHaveBeenCalledWith(poLogin.login, poLogin.password);
  });
});
