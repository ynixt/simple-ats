import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { SpyObject, mockProvider, HttpMethod, SpectatorHttp, createHttpFactory } from '@ngneat/spectator';
import { PoNotificationService } from '@po-ui/ng-components';
import { of, throwError } from 'rxjs';

import { TranslateService } from 'src/app/shared/translate.service';
import { AuthService } from '../auth.service';
import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let interceptor: ErrorInterceptor;
  let spectator: SpectatorHttp<ErrorInterceptor>;

  let translateService: SpyObject<TranslateService>;
  let authService: SpyObject<AuthService>;
  let poNotificationService: SpyObject<PoNotificationService>;

  const createInterceptor = createHttpFactory<ErrorInterceptor>({
    service: ErrorInterceptor,
    providers: [mockProvider(TranslateService), mockProvider(AuthService), mockProvider(PoNotificationService)],
  });

  beforeEach(() => {
    spectator = createInterceptor();
    interceptor = spectator.service;

    translateService = spectator.inject(TranslateService);
    authService = spectator.inject(AuthService);
    poNotificationService = spectator.inject(PoNotificationService);

    translateService.translate.and.callFake(async (key: string) => key);
    authService.logout.and.stub();
    poNotificationService.error.and.stub();

    spyOn<any>(interceptor, 'showSessionExpired').and.callThrough();
    spyOn<any>(interceptor, 'showGenericError').and.callThrough();
  });

  it('should create', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('intercept', () => {
    it('without errors do nothing', () => {
      return spectator.service
        .intercept(new HttpRequest<unknown>(HttpMethod.GET, '/api/auth/login'), {
          handle: (request: HttpRequest<unknown>) => {
            expect(interceptor['showSessionExpired']).not.toHaveBeenCalled();
            expect(interceptor['showGenericError']).not.toHaveBeenCalled();
            expect(authService.logout).not.toHaveBeenCalled();

            return of(new HttpResponse({ status: 200 }));
          },
        })
        .toPromise();
    });

    it('error 401 on /api/auth/login. Must do nothing', async () => {
      await expectAsync(
        spectator.service
          .intercept(new HttpRequest<unknown>(HttpMethod.GET, '/api/auth/login'), {
            handle: (request: HttpRequest<unknown>) => {
              return throwError(new HttpErrorResponse({ status: 401 }));
            },
          })
          .toPromise(),
      ).toBeRejected();

      expect(interceptor['showSessionExpired']).not.toHaveBeenCalled();
      expect(interceptor['showGenericError']).not.toHaveBeenCalled();
      expect(authService.logout).not.toHaveBeenCalled();
    });

    it('error 401 any route other than /api/auth/login. Must logout user', async () => {
      await expectAsync(
        spectator.service
          .intercept(new HttpRequest<unknown>(HttpMethod.GET, '/api/example'), {
            handle: (request: HttpRequest<unknown>) => {
              return throwError(new HttpErrorResponse({ status: 401 }));
            },
          })
          .toPromise(),
      ).toBeRejected();

      expect(interceptor['showGenericError']).not.toHaveBeenCalled();
      expect(authService.logout).toHaveBeenCalled();
      expect(poNotificationService.error).toHaveBeenCalledWith('sessionExpired');
      expect(translateService.translate).toHaveBeenCalledWith('sessionExpired');
    });

    it('error <> 401. Must show generic error', async () => {
      await expectAsync(
        spectator.service
          .intercept(new HttpRequest<unknown>(HttpMethod.GET, '/api/example'), {
            handle: (request: HttpRequest<unknown>) => {
              return throwError(new HttpErrorResponse({ status: 400 }));
            },
          })
          .toPromise(),
      ).toBeRejected();

      expect(interceptor['showSessionExpired']).not.toHaveBeenCalled();
      expect(authService.logout).not.toHaveBeenCalled();
      expect(poNotificationService.error).toHaveBeenCalledWith('genericError');
      expect(translateService.translate).toHaveBeenCalledWith('genericError');
    });
  });
});
