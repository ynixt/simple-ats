import { Component, OnDestroy, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { Permission } from 'src/app/core/models';
import { PermissionsSelectors } from 'src/app/store/services/selectors';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  public menuItems: PoMenuItem[] = [];

  private permissionsSubscription: Subscription;

  constructor(private translateService: TranslateService, private permissionsSelectors: PermissionsSelectors) {}

  public ngOnInit(): void {
    this.permissionsSubscription = this.permissionsSelectors.permissions$.subscribe(permissions => {
      this.createMenu(permissions);
    });
  }

  public ngOnDestroy(): void {
    if (this.permissionsSubscription) {
      this.permissionsSubscription.unsubscribe();
    }
  }

  private async createMenu(permissions: Permission[]): Promise<void> {
    const menuItems: PoMenuItem[] = [
      {
        label: await this.translateService.translate('pages.home'),
        link: '/',
      },
    ];

    if (permissions.find(permission => permission.code === 'register_job_vacancy')) {
      menuItems.push({
        label: await this.translateService.translate('pages.registerJobVacancy'),
        link: '/jobs/new',
      });
    }

    this.menuItems = menuItems;
  }
}
