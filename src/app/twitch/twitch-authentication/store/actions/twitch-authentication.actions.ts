import { createAction } from '@ngrx/store';

export const checkLogin = createAction(
  '[Twitch Auth] Check Login',
);

export const login = createAction(
  '[Twitch Auth] Login',
);

export const logout = createAction(
  '[Twitch Auth] Logout',
);

export const loginSuccess = createAction(
  '[Twitch Auth] Login Success',
  (accessToken: string, username?: string) => ({accessToken, username}),
);

export const loginFailure = createAction(
  '[Twitch Auth] Login Failure',
);
