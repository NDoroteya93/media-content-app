import { Media } from 'src/app/shared/models/media.models';

export interface StorageData {
  data: TabsData[];
  search: string;
  active: boolean;
  id?: string;
}

export interface TabsData {
  data: Media[];
  title: string;
  page: string;
  active: boolean;
}
