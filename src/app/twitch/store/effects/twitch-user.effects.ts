import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HelixService } from "app/twitch/services/helix.service";
import * as TwitchUserActions from "app/twitch/store/actions/twitch-user.actions";
import { updateEmoteSetsSuccess } from "app/twitch/store/actions/twitch-user.actions";
import { TwitchAuthenticationService } from "app/twitch/twitch-authentication/serivces/twitch-authentication.service";
import { EMPTY } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";


@Injectable()
export class TwitchUserEffects {
  updateEmoteSets$ = createEffect(() => this.actions$
    .pipe(
      ofType(TwitchUserActions.updateEmoteSets),
      mergeMap(({emoteset}) => this.helix.getEmotesets(emoteset.split(','), this.auth.getAccessToken()).pipe(
        map((emotesets) => updateEmoteSetsSuccess(emotesets)),
        catchError(() => EMPTY),
      ))),
  );


  constructor(private actions$: Actions, private helix: HelixService, private auth: TwitchAuthenticationService) {
  }
}
