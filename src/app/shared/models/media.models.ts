import { YouTubeData } from '../interfaces/youtube-data.interface';
import { CustomSearchData } from '../interfaces/custom-image-search.interface';
import { Thumbnail } from '../interfaces/thumbnail.interface';

export class Media {

  constructor(
    public thumbnail: Thumbnail = null,
    public source: string = '',
    public title: string = '',
    public description: string = '',
    public link: string = '',
  ) { }

  public static getFromData(data: YouTubeData | CustomSearchData): Media {

    if (data.kind.indexOf('youtube') !== -1) {
      const youtubeData = data as YouTubeData;

      return new Media(
        youtubeData.snippet.thumbnails.high,
        `'https://www.youtube.com/watch?v=${youtubeData.id.videoId}`,
        youtubeData.snippet.title,
        youtubeData.snippet.description,
        `'https://www.youtube.com/watch?v=${youtubeData.id.videoId}`
      );
    } else {

      const imageData = data as CustomSearchData;

       return new Media(
        imageData.pagemap.imageobject ? imageData.pagemap.imageobject[0] : null,
        imageData.pagemap.cse_image[0].src,
        imageData.title,
        imageData.snippet,
        imageData.link
      );
    }
  }
}
