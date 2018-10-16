import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { YouTubeData } from 'src/app/shared/interfaces/youtube-data.interface';
import { Media } from 'src/app/shared/models/media.models';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent implements OnChanges {

  @Input() public mediaList: Media[];
  // @Output() getMoreItems  = new EventEmitter<any>();

  public mediaScrollDistance = 2;
  public mediaScrollThrottle = 50;

  constructor() { }

  public ngOnChanges(currentData) {
    // if (currentData && currentData.mediaList) {
    //   this.mediaList = currentData.mediaList;
    // }
  }

  public onMediaScrollDown(): void {
    // this.getMoreItems.emit();
  }

}
