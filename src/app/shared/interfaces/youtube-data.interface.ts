export interface YouTubeData {
  kind: string;
  etag: string;
  id: { kind: string, videoId: string };
  snippet: {
    publishedAt: Date,
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      hight: Thumbnail;
    }
  channelTitle: string;
  liveBroadcastContent: string;
  };
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
