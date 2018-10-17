import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import appConfig from '../../config/main.config';
import { filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private httpClient: HttpClient) { }

  public search(terms: Observable<any>, page?: string): Observable<any> {
    return terms.pipe(
      filter((value: string) => value.length > 2),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(result => {
        return forkJoin([this.getImages(result), this.getYoutubeVideos(result)]);
      })
    );
  }

  public getYoutubeVideos(searchTerm: string, page?: string): Observable<any> {
    const url = page
      ? `${appConfig.youTubeEndpoint}?q=${searchTerm}&key=${appConfig.api_key}&maxResults=20&part=snippet&type=video&pageToken=${page}`
      : `${appConfig.youTubeEndpoint}?q=${searchTerm}&key=${appConfig.api_key}&maxResults=20&part=snippet&type=video`;

    return this.httpClient.get(url);
  }

  public getImages(searchTerm: string, page?: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    const options = { headers, responseType: 'json' };

    return this.httpClient.get(
      `${appConfig.customSearchEndpoint}?q=${searchTerm}&key=${appConfig.api_key}&cx=${appConfig.cx_id}`
    );
  }
}
