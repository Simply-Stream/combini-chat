import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TwitchAuthenticationActions from '../actions/twitch-authentication.actions';
import { loginFailure, loginSuccess } from '../actions/twitch-authentication.actions';
import { TwitchAuthenticationService } from '../../../serivces/twitch-authentication.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class TwitchAuthenticationEffects {
  checkLogin$ = createEffect(() => this.actions$
    .pipe(
      ofType(TwitchAuthenticationActions.checkLogin),
      mergeMap(() => this.authService.checkLogin()
        .pipe(
          map((success) => success ? loginSuccess(this.authService.getAccessToken(), this.authService.getUsername()) : loginFailure()),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  login$ = createEffect(() => this.actions$
    .pipe(
      ofType(TwitchAuthenticationActions.login),
      tap(() => this.authService.login()),
    ), {dispatch: false},
  );

  logout$ = createEffect(() => this.actions$
    .pipe(
      ofType(TwitchAuthenticationActions.logout),
      tap(() => this.authService.logout()),
    ), {dispatch: false},
  );

  constructor(private actions$: Actions, private authService: TwitchAuthenticationService) {
  }
}
