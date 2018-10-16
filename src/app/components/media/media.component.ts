import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

// Services
import { MediaService } from '../../core/media/media.service';
import { StorageService } from '../../core/storage/storage.service';

// Interfaces and Models
import { SubTabsMapArray, TabTypes } from '../../shared/const/sub-tabs.const';
import { Media } from 'src/app/shared/models/media.models';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit, OnDestroy {

  public subTabsData = SubTabsMapArray;
  public tabTypes = TabTypes;
  public result;

  public searchTerm: string;
  public activeTabData;
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
    }
  }
  
  public ngOnDestroy(): void {
    if (this.tabChangeSubs) {
      this.tabChangeSubs.unsubscribe();
    }
  }

  public onSearch(term: Subject<any>): void {

    term.subscribe(result => this.searchTerm = result);

    this.mediaService
      .search(term)
      .subscribe(result => {
          // Set Images data
        // if (result[TabTypes.IMAGES]) {
        //   this.subTabsData[TabTypes.IMAGES].data = result[0].items
        //     .map(item => Media.getFromData(item));
        //   this.subTabsData[TabTypes.IMAGES].page = result[0].queries.nextPage;
        // }

        //   // Set videos data
        // if (result[TabTypes.VIDEOS]) {
        //   this.subTabsData[TabTypes.VIDEOS].data = result[TabTypes.VIDEOS].items
        //     .map(item => Media.getFromData(item));
        //   this.subTabsData[TabTypes.VIDEOS].page = result[TabTypes.VIDEOS].nextPageToken;
        // }
        this.result = result.items.map(data => Media.getFromData(data));

        this.activeTabData.data = this.result;
        this.activeTabData.search = this.searchTerm;
        this.storage.store(this.activeTabData.id, this.activeTabData);

        this.cd.detectChanges();
    });
  }

  private onChangeTab(): void {
    
    this.tabChangeSubs =  this.storage.changes.subscribe(tab => {
      this.activeTabData = {
        ...this.storage.getItem(tab.tabId),
        id: tab.tabId
      };

      console.log('update tab', this.activeTabData);
    });
  }
}
