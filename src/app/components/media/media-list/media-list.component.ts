import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { YouTubeData } from 'src/app/shared/interfaces/youtube-data.interface';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent implements OnChanges {

  @Input() public mediaList: YouTubeData[];
  @Output() getMoreItems  = new EventEmitter<any>();

  public mediaScrollDistance = 2;
  public mediaScrollThrottle = 50;

  constructor() { }

  public ngOnChanges(currentData) {
    console.log(currentData);
  }

  public onMediaScrollDown(): void {
    this.getMoreItems.emit();
  }

}
