import { fakeAsync, tick } from '@angular/core/testing';
import { createComponentFactory, mockProvider, Spectator, SpyObject } from '@ngneat/spectator';
import { PoMenuComponent } from '@po-ui/ng-components';
import { MockComponents } from 'ng-mocks';
import { Subject } from 'rxjs';

import { Permission } from 'src/app/core/models';
import { PermissionsSelectors } from 'src/app/store/services/selectors';
import { TestUnsubscribeOnMethod } from 'src/test.commom.spec';
import { TranslateService } from '../translate.service';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let spectator: Spectator<MenuComponent>;
  let translateService: SpyObject<TranslateService>;

  const permissionsSubject = new Subject<Permission[]>();

  const createComponent = createComponentFactory<MenuComponent>({
    component: MenuComponent,
    declarations: [MockComponents(PoMenuComponent)],
    providers: [mockProvider(TranslateService), mockProvider(PermissionsSelectors, { permissions$: permissionsSubject.asObservable() })],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    translateService = spectator.inject(TranslateService);

    translateService.translate.and.callFake(async (key: string) => key);

    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnDestroy', () => {
    TestUnsubscribeOnMethod(component, 'permissionsSubscription', 'ngOnDestroy');
  });

  describe('createMenu', () => {
    it('no permission', fakeAsync(() => {
      const permissions: Permission[] = [];

      permissionsSubject.next(permissions);

      tick();

      expect(component.menuItems).toEqual([
        {
          label: 'pages.home',
          link: '/home',
        },
        {
          label: 'pages.listJobVacancy',
          link: '/jobs',
        },
      ]);
    }));

    it('with view_dashboard permission', fakeAsync(() => {
      const permissions: Permission[] = [
        {
          code: 'view_dashboard',
        },
      ];

      permissionsSubject.next(permissions);

      tick();

      expect(component.menuItems).toEqual([
        {
          label: 'pages.dashboard',
          link: '/',
        },
        {
          label: 'pages.home',
          link: '/home',
        },
        {
          label: 'pages.listJobVacancy',
          link: '/jobs',
        },
      ]);
    }));

    it('with register_job_vacancy permission', fakeAsync(() => {
      const permissions: Permission[] = [
        {
          code: 'register_job_vacancy',
        },
      ];

      permissionsSubject.next(permissions);

      tick();

      expect(component.menuItems).toEqual([
        {
          label: 'pages.home',
          link: '/home',
        },
        {
          label: 'pages.listJobVacancy',
          link: '/jobs',
        },
        {
          label: 'pages.registerJobVacancy',
          link: '/jobs/new',
        },
      ]);
    }));
  });
});
