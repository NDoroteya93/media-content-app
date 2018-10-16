import { Component, OnInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
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
  public nextPage: string;
  public searchActionEmitter = new EventEmitter<string>();

  private searchTerm$: Subject<any>;
  

  constructor(private mediaService: MediaService, private cf: ChangeDetectorRef) {
    this.videosResult = [];
   }

  public ngOnInit(): void {
    this.searchActionEmitter.subscribe(res => { 
      switch(res) {
        case 'image':
          console.log('image');
          break;
        case 'videos':
          console.log('image');
          break;
        default:
          break;
          
      }
    })
  }

  public onSearchVideos(term: Subject<any>, page?: string): void {
    this.searchTerm$ = term;
    this.mediaService.search(term, this.nextPage || null).subscribe(result => {
      // this.videosResult = [...this.videosResult, ...result.items];
      this.videosResult = result.items;
      this.cf.detectChanges();
      // debugger;
      if (result.nextPageToken) {
        this.nextPage = result.nextPageToken;
      }

    });
  }

  public appendItems(): void {
    this.onSearchVideos(this.searchTerm$, this.nextPage);
  }

  public onSearchImages(term: string): void {
    this.mediaService.getImages(term)
    .subscribe(images => (this.imagesResult = images));
  }

}
