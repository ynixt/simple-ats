import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { AuthActions } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(action =>
        from(this.authService.login(action.email, action.password)).pipe(
          map(user => AuthActions.authSuccess({ user })),
          catchError(error => of(AuthActions.authError({ error }))),
        ),
      ),
    ),
  );
}
