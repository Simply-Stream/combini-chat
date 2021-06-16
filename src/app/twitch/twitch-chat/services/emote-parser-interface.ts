import { Message } from 'app/twitch/twitch-chat/twitch-chat-message/models/message';

export interface EmoteParserInterface {
  parse(message: Message): string;
}
