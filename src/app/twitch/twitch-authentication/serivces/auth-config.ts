import { AuthConfig } from 'angular-oauth2-oidc';
import { AppConfig } from 'environments/environment';

export const authConfig: AuthConfig = {
  issuer: 'https://id.twitch.tv/oauth2',
  clientId: AppConfig.twitch.clientId,
  loginUrl: AppConfig.twitch.loginUrl,
  tokenEndpoint: AppConfig.twitch.tokenUrl,
  redirectUri: AppConfig.twitch.redirectUrl,
  responseType: 'token id_token',
  scope: 'chat:read chat:edit',
  showDebugInformation: !AppConfig.production,
};
