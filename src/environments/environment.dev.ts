export const AppConfig = {
  production: false,
  environment: 'DEV',
  twitch: {
    clientId: 'tmctv857ynx6i3w7yb3c6ec7i6ow5y',
    loginUrl: 'https://id.twitch.tv/oauth2/authorize',
    tokenUrl: 'https://id.twitch.tv/oauth2/token',
  },
  bttv: {
    endpoints: {
      api: 'https://api.betterttv.net/3/',
      cdn: 'https://cdn.betterttv.net/',
    },
  },
};
