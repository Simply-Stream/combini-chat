import { Message } from '../twitch-chat-message/message';
import { Observable } from 'rxjs';

export interface EmoteParserInterface {
  parse(message: Message): Observable<string>;
}
