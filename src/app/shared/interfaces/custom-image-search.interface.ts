import { Thumbnail } from './thumbnail.interface';

export interface CustomSearchData {
  cacheId: string;
  displayLink: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  htmlSnippet: string;
  htmlTitle: string;
  kind: string;
  link: string;
  snippet: string;
  title: string;
  pagemap: PageMap;
}

export interface PageMap {
  cse_image: { src: string }[];
  cse_thumbnail: Thumbnail[];
  imageobject: Thumbnail[];
  metatags: any[];
  videoobject: any[];
}
