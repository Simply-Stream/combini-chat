import { Message } from '../twitch-chat-message/message';

export interface EmoteParserInterface {
  parse(message: Message): string;
}
