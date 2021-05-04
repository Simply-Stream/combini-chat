import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { AppConfig } from '../../environments/environment';

export const twitchFeatureKey = 'twitch';

export interface State {

}

export const reducers: ActionReducerMap<State> = {

};

export const metaReducers: MetaReducer<State>[] = !AppConfig.production ? [] : [];
