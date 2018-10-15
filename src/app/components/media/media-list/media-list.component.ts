import { Component, OnInit, Input } from '@angular/core';
import { YouTubeData } from 'src/app/shared/interfaces/youtube-data.interface';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent implements OnInit {

  @Input() videos: YouTubeData[];

  constructor() { }

  ngOnInit() {
  }

}
