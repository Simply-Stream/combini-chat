export interface Identity {
  username: string;
  password: string | (() => (string | Promise<string>));
}
