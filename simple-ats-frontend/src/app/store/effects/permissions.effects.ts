import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { PermissionsService } from 'src/app/core/permissions.service';
import { PermissionsActions } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class PermissionsEffects {
  constructor(private actions$: Actions, private permissionsService: PermissionsService) {}

  getPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PermissionsActions.getPermissions),
      switchMap(() =>
        from(this.permissionsService.getPermissions()).pipe(
          map(permissions => PermissionsActions.getPermissionsSuccess({ permissions })),
          catchError(error => of(PermissionsActions.getPermissionsError({ error }))),
        ),
      ),
    ),
  );
}
