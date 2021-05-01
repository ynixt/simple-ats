import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { PoNotificationService } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';

import { take } from 'rxjs/operators';
import { TokenService } from './core/token.service';
import { AuthDispatchers, PermissionDispatchers } from './store';
import { PermissionsSelectors } from './store/services/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private permissionsSubscription: Subscription;

  constructor(
    private permissionDispatchers: PermissionDispatchers,
    private permissionsSelectors: PermissionsSelectors,
    private authDispatchers: AuthDispatchers,
    private tokenService: TokenService,
    private poNotification: PoNotificationService,
    private translocoService: TranslocoService,
  ) {}

  public ngOnInit(): void {
    this.authDispatchers.loginByStorage();

    if (this.tokenService.tokenIsSaved()) {
      this.permissionDispatchers.getPermissions();
    }

    this.permissionsSubscription = this.permissionsSelectors.state$.subscribe(permissionsState => {
      if (permissionsState.error) {
        if (permissionsState.error instanceof HttpErrorResponse && permissionsState.error.status === 401) {
          this.logoutByInvalidUserSeason();
        }
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.permissionsSubscription) {
      this.permissionsSubscription.unsubscribe();
    }
  }

  private async logoutByInvalidUserSeason(): Promise<void> {
    this.poNotification.error(await this.translocoService.selectTranslate('sessionExpired').pipe(take(1)).toPromise());

    this.authDispatchers.logout();
  }
}
