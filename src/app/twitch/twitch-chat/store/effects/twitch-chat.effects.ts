import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { BadgesService } from "app/twitch/twitch-chat/services/badges.service";
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { TwitchAuthenticationService } from '../../../twitch-authentication/serivces/twitch-authentication.service';
import * as TwitchAuthActions from '../../../twitch-authentication/store/actions/twitch-authentication.actions';
import { BttvEmoteService } from '../../services/bttv-emote.service';
import { TwitchChatService } from '../../services/twitch-chat.service';
import * as TwitchChatActions from '../actions/twitch-chat.actions';
import { connectSuccess } from '../actions/twitch-chat.actions';
import { State } from '../reducers/twitch-chat.reducer';
import { selectChannels } from '../selectors/twitch-chat.selectors';

@Injectable()
export class TwitchChatEffects {
  loginSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(TwitchAuthActions.loginSuccess),
      withLatestFrom(this.store.pipe(select(selectChannels))),
      tap(([action, latest]) => this.twitchService.connect(latest, this.authService.getIdentity())),
    ), {dispatch: false},
  );

  connect$ = createEffect(() => this.actions$
    .pipe(
      ofType(TwitchChatActions.connect),
      mergeMap(({channel, identity}) => this.twitchService.connect(channel, identity)
        .pipe(
          map(() => connectSuccess()),
          catchError(() => EMPTY),
        )),
    ),
  );

  addChannel$ = createEffect(() => this.actions$.pipe(
    ofType(TwitchChatActions.addChannels),
    tap(({channels}) => {
      channels.forEach(channel => {
        this.twitchService.join(channel);
      });
    }),
  ), {dispatch: false});

  sendMessage$ = createEffect(() => this.actions$.pipe(
    ofType(TwitchChatActions.sendMessage),
    tap(({channel, message}) => {
      this.twitchService.sendMessage(channel, message);
    }),
  ), {dispatch: false});

  roomState$ = createEffect(() => this.actions$.pipe(
    ofType(TwitchChatActions.roomState),
    switchMap(({roomState}) => of(
      TwitchChatActions.updateChannelEmotes(roomState['room-id']),
      TwitchChatActions.updateChannelBadges(roomState['room-id']),
      TwitchChatActions.roomStateSuccess(),
    )),
  ));

  updateChannelBadges$ = createEffect(() => this.actions$.pipe(
    ofType(TwitchChatActions.updateChannelBadges),
    mergeMap(({channelId}) =>
      this.badgesService.updateChannelBadges(channelId)
        .pipe(
          map(() => TwitchChatActions.updateChannelBadgesSuccess()),
          catchError(() => EMPTY),
        )),
  ));

  updateChannelEmotes$ = createEffect(() => this.actions$.pipe(
    ofType(TwitchChatActions.updateChannelEmotes),
    mergeMap(({channelId}) =>
      this.bttvEmotes.updateChannelEmotes(channelId)
        .pipe(
          map(() => TwitchChatActions.updateChannelEmotesSuccess()),
          catchError(() => EMPTY),
        )),
  ));

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private twitchService: TwitchChatService,
    private authService: TwitchAuthenticationService,
    private bttvEmotes: BttvEmoteService,
    private badgesService: BadgesService,
  ) {
  }
}
