import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TwitchChatService } from '../../services/twitch-chat.service';
import * as TwitchChatActions from '../actions/twitch-chat.actions';
import { connectSuccess } from '../actions/twitch-chat.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class TwitchChatEffects {
  connect$ = createEffect(() => this.actions$
    .pipe(
      ofType(TwitchChatActions.connect),
      mergeMap(({channel}) => this.twitchService.connect(channel)
        .pipe(
          map(() => connectSuccess()),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  addChannel$ = createEffect(() => this.actions$.pipe(
    ofType(TwitchChatActions.addChannel),
    tap(({channel}) => this.twitchService.join(channel)),
  ), {dispatch: false});

  constructor(private actions$: Actions, private twitchService: TwitchChatService) {
  }
}
