import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../core/media/media.service';
import { Subject } from 'rxjs';
import { YouTubeData } from 'src/app/shared/interfaces/youtube-data.interface';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  public videosResult: YouTubeData[];
  public imagesResult: any[];
  public allResult: any[];

  constructor(private mediaService: MediaService) { }

  public ngOnInit(): void {
  }

  public onSearchVideos(term: Subject<any>): void {
    this.mediaService.search(term).subscribe(result => {
      this.videosResult = result.items;
    });
  }

  public onSearchImages(term: string): void {
    this.mediaService.getImages(term, 1)
    .subscribe(images => (this.imagesResult = images));
  }

}
