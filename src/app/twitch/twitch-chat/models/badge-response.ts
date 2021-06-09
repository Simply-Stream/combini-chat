import { Badge } from "app/twitch/twitch-chat/models/badge";

export interface BadgeResponse {
  badge_sets: {
    [badgeName: string]: {
      versions: {
        [name: string]: Badge
      }
    }
  }
}
