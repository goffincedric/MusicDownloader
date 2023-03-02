export const RegexConstants = {
  YOUTUBE: {
    YOUTUBE_URL_REGEX: /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|playlist\?|watch\?v=|watch\?.+(?:&|&#38;);v=))([a-zA-Z0-9\-_]{11})?(?:(?:\?|&|&#38;)index=(\d{1,3}))?(?:(?:\?|&|&#38;)?list=([a-zA-Z\-_0-9]{34}))?(?:\S+)?/
  },
  AXIOS: {
    CONTENT_DISPOSITION_HEADER: /(attachment|inline);\s?filename="([^"]+)"/
  }
};