import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

// Services
import { MediaService } from '../../core/media/media.service';
import { StorageService } from '../../core/storage/storage.service';

// Interfaces and Models
import { SubTabsMapArray, TabTypes } from '../../shared/const/sub-tabs.const';
import { Media } from 'src/app/shared/models/media.models';
import { StorageData } from '../../shared/interfaces/storage.interface';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit, OnDestroy {

  public subTabsData = SubTabsMapArray;
  public tabTypes = TabTypes;
  public searchTerm = '';
  public noItems: boolean;
  public activeTabData: StorageData;

  private tabChangeSubs: Subscription;

  constructor(
    private mediaService: MediaService,
    private cd: ChangeDetectorRef,
    private storage: StorageService
    ) {
      this.onChangeTab();
    }

  public ngOnInit(): void {
    this.activeTabData = {
      ...this.storage.getStorage().filter(tab => tab.value.active)[0].value,
      id: this.storage.getStorage().filter(tab => tab.value.active)[0].key
    };
  }

  public ngOnDestroy(): void {
    if (this.tabChangeSubs) {
      this.tabChangeSubs.unsubscribe();
    }
  }

  public onSearch(term: Subject<any>): void {

    this.getSearchTerm(term);

    this.mediaService
      .search(term)
      .subscribe(result => {

          // Set Images data
        if (result[TabTypes.IMAGES] && result[TabTypes.IMAGES].items) {
          this.subTabsData[TabTypes.IMAGES].data = result[TabTypes.IMAGES].items
            .map(item => Media.getFromData(item));
          this.subTabsData[TabTypes.IMAGES].page = result[TabTypes.IMAGES].queries.nextPage;

        }

        // Set videos data
        if (result[TabTypes.VIDEOS] && result[TabTypes.VIDEOS].items) {
          this.subTabsData[TabTypes.VIDEOS].data = result[TabTypes.VIDEOS].items
            .map(item => Media.getFromData(item));
          this.subTabsData[TabTypes.VIDEOS].page = result[TabTypes.VIDEOS].nextPageToken;
        }

        if (!result[TabTypes.VIDEOS].items || !result[TabTypes.IMAGES].items) {
          this.noItems = true;
        }

        this.activeTabData.data = this.subTabsData;
        this.activeTabData.search = this.searchTerm;

        // Store the new changes
        this.storage.store(this.activeTabData.id, this.activeTabData);

        this.cd.detectChanges();
    });
  }

  // Infinite scroll
  public getMoreItems(): void {
    console.log(this.subTabsData);
  }

  public getSearchTerm(term: Subject<any>): void {
    term.subscribe(result => {
      this.searchTerm = result;
      this.noItems = false;

      if (result.trim().length === 0) {
        this.clearDataOnChangeTab();
      }
    });
  }

  public onChangeTab(): void {

    this.tabChangeSubs = this.storage.changes
      .subscribe((tab: { tabId: string }) => {
        const storageData: StorageData = this.storage.getItem(tab.tabId);

        this.searchTerm = storageData.search;
        this.clearDataOnChangeTab();

        if (storageData.data.length > 0) {
          this.subTabsData = storageData.data;
        }

        this.cd.detectChanges();
        // set data in the storage
        this.activeTabData = {
          ...storageData,
          id: tab.tabId
        };
    });
  }

  private clearDataOnChangeTab(): void {
    this.subTabsData[TabTypes.VIDEOS].data = [];
    this.subTabsData[TabTypes.IMAGES].data = [];
  }
}
