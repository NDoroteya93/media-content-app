import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../core/media/media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  public videosResult: any;
  public imagesResult: any;

  constructor(private mediaService: MediaService) { }

  ngOnInit() {
  }

  public onSearchVideos(term: string): void {

    this.mediaService.getYoutubeVideos(term, 1)
    .subscribe(videos => (this.videosResult = videos));
  }

  public onSearchImages(term: string): void {

    this.mediaService.getImages(term, 1)
    .subscribe(images => (this.imagesResult = images));
  }

}
