import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { PoNotificationService } from '@po-ui/ng-components';
import { PoPageLogin } from '@po-ui/ng-templates';
import { Observable, Subscription } from 'rxjs';
import { AuthDispatchers } from 'src/app/store';
import { AuthState } from 'src/app/store/reducers/auth.reducer';
import { AuthSelectors } from 'src/app/store/services/selectors';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  public state$: Observable<AuthState>;

  private isLoggedSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(
    private authDispatchers: AuthDispatchers,
    private authSelectors: AuthSelectors,
    private poNotification: PoNotificationService,
    private translocoService: TranslocoService,
  ) {}

  public ngOnInit(): void {
    this.state$ = this.authSelectors.state$;

    this.isLoggedSubscription = this.authSelectors.isLogged$.subscribe(isLogged => {
      console.log(`Estou logado? ${isLogged} :)`);
    });

    this.errorSubscription = this.authSelectors.error$.subscribe(error => {
      if (error != null) {
        this.showError(error);
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.isLoggedSubscription) {
      this.isLoggedSubscription.unsubscribe();
    }
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }

  public login(formData: PoPageLogin): void {
    this.authDispatchers.login(formData.login, formData.password);
  }

  private showError(error: any) {
    if (error) {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        this.poNotification.error(this.translocoService.translate('login.invalidCredentials'));
      } else {
        this.poNotification.error(this.translocoService.translate('genericError'));
        console.error(error);
      }
    }
  }
}
