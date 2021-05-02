import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoNotificationService } from '@po-ui/ng-components';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TranslateService } from 'src/app/shared/translate.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private poNotification: PoNotificationService,
    private translateService: TranslateService,
    private authService: AuthService,
  ) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          if (error.status === 401 && request.url !== '/api/auth/login') {
            this.showSessionExpired();
            this.authService.logout();
          } else if (error.status !== 401) {
            this.showGenericError();
          }
        }

        return throwError(error);
      }),
    );
  }

  private async showSessionExpired(): Promise<void> {
    this.showError(await this.translateService.translate('sessionExpired'));
  }

  private async showGenericError(): Promise<void> {
    this.showError(await this.translateService.translate('genericError'));
  }

  private showError(error: string): void {
    this.poNotification.error(error);
  }
}
