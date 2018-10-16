import { Media } from '../models/media.models';

export enum TabTypes {
    IMAGES,
    VIDEOS
}

export const SUB_TABS: any = {
  [TabTypes.IMAGES]: {
    title: 'Images',
    data: [],
    page: null
  },
  [TabTypes.VIDEOS]: {
    title: 'Videos',
    data: [],
    page: null
  }
};

export const SubTabsMapArray: any[] = (function () {
    const arr = [];

    Object.keys(SUB_TABS).forEach(tab => {
        arr.push(SUB_TABS[tab]);
    });

    return arr;
})();
