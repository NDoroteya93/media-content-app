import { TabsData } from '../interfaces/storage.interface';

export enum TabTypes {
    IMAGES,
    VIDEOS
}

export const SUB_TABS: { [index: number]: TabsData } = {
  [TabTypes.IMAGES]: {
    title: 'Images',
    data: [],
    page: null,
    active: true
  },
  [TabTypes.VIDEOS]: {
    title: 'Videos',
    data: [],
    page: null,
    active: false
  }
};

export const SubTabsMapArray: TabsData[] = (function () {
    const arr = [];

    Object.keys(SUB_TABS).forEach(tab => {
        arr.push(SUB_TABS[tab]);
    });

    return arr;
})();
