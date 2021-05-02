import { fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { Subject } from 'rxjs';

import { userMock } from 'src/app/core/models/mock';
import { AuthDispatchers } from 'src/app/store';
import { AuthState } from 'src/app/store/reducers/auth.reducer';
import { AuthSelectors } from 'src/app/store/services/selectors';
import { TranslateService } from '../translate.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let spectator: Spectator<HeaderComponent>;

  const authStateSubject = new Subject<AuthState>();

  const createComponent = createComponentFactory<HeaderComponent>({
    component: HeaderComponent,
    providers: [
      mockProvider(AuthSelectors, { state$: authStateSubject.asObservable() }),
      mockProvider(TranslateService, { translate: async (key: string) => key }),
      mockProvider(AuthDispatchers),
      mockProvider(Router),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('authSelectors.state$', () => {
    it('state with user', fakeAsync(() => {
      const user = userMock();

      authStateSubject.next({
        loading: false,
        user,
      });

      tick();

      expect(component.profile).toEqual({
        avatar: `https://ui-avatars.com/api/?name=${user.name}`,
        subtitle: user.email,
        title: user.name,
      });

      expect(component.profileActions).toEqual([
        {
          icon: 'po-icon-exit',
          label: 'header.logout',
          type: 'danger',
          separator: true,
          action: jasmine.anything(),
        },
      ]);
    }));

    it('state without user', fakeAsync(() => {
      authStateSubject.next({
        loading: false,
        user: null,
      });

      tick();

      expect(component.profile).toBeUndefined();
      expect(component.profileActions).toBeUndefined();
    }));
  });

  it('logout', () => {
    const authDispatchers = spectator.inject(AuthDispatchers);
    const router = spectator.inject(Router);

    authDispatchers.logout.and.stub();
    router.navigateByUrl.and.stub();

    component['logout']();

    expect(authDispatchers.logout).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
