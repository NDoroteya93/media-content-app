import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Media } from 'src/app/shared/models/media.models';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent {

  @Input() public mediaList: Media[];
  @Output() getMoreItems  = new EventEmitter<any>();

  public mediaScrollDistance = 2;
  public mediaScrollThrottle = 1000;

  constructor() { }

  public onMediaScrollDown(event): void {
    this.getMoreItems.emit();
  }

}
