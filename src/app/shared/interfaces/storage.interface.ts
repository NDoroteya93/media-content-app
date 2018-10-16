import { Media } from 'src/app/shared/models/media.models';

export interface StorageData {
  data: Media[];
  search: string;
  active: boolean;
}
