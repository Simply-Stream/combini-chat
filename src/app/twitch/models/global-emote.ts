export interface GlobalEmote {
  id: string;
  name: string;
  images: {
    url_1x: string;
    url_2x: string;
    url_4x: string;
  };
  format: string[];
  scale: string[];
  theme_mode: string[];
}
