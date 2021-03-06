import { Thumbnail } from './thumbnail.interface';

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
      high: Thumbnail;
    }
  channelTitle: string;
  liveBroadcastContent: string;
  };
}

