import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ChannelEmote } from "app/twitch/models/channel-emote";
import { HelixService } from "app/twitch/services/helix.service";
import * as TwitchUserActions from "app/twitch/store/actions/twitch-user.actions";
import { updateEmoteSetsSuccess } from "app/twitch/store/actions/twitch-user.actions";
import { TwitchAuthenticationService } from "app/twitch/twitch-authentication/serivces/twitch-authentication.service";
import { EMPTY, forkJoin, Observable } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";


@Injectable()
export class TwitchUserEffects {
  updateEmoteSets$ = createEffect(() => this.actions$
    .pipe(
      ofType(TwitchUserActions.updateEmoteSets),
      mergeMap(({emoteset}) => {
        const emotesets: string[] = emoteset.split(',');
        const forkedObservables: Observable<any>[] = [];

        for (let i = 0; i < Math.floor(emotesets.length / 25); i++) {
          forkedObservables.push(this.helix.getEmotesets(emotesets.slice(i * 25, i * 25 + 25), this.auth.getAccessToken()));
        }

        return forkJoin(forkedObservables).pipe(
          map(forkedEmotesets => {
            const sortedEmotesets: {
              [emoteType: string]: {
                [userId: string]: ChannelEmote[]
              }
            } = {};

            forkedEmotesets.forEach(emotesets => {
              emotesets.forEach(((emote: ChannelEmote) => {
                if (!sortedEmotesets[emote.emote_type]) {
                  sortedEmotesets[emote.emote_type] = {
                    [emote.owner_id]: [],
                  };
                } else if (!sortedEmotesets[emote.emote_type][emote.owner_id]) {
                  sortedEmotesets[emote.emote_type][emote.owner_id] = [];
                }

                sortedEmotesets[emote.emote_type][emote.owner_id].push(emote);
              }));
            });

            return sortedEmotesets;
          }),
          map((emotesets) => updateEmoteSetsSuccess({emotesets})),
          catchError(() => EMPTY),
        );
      })),
  );

  constructor(private actions$: Actions, private helix: HelixService, private auth: TwitchAuthenticationService) {
  }
}
