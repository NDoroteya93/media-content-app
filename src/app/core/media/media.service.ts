import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import appConfig from '../../config/main.config';
import { filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private httpClient: HttpClient) { }

  public search(terms: Observable<any>): Observable<any> {
    return terms.pipe(
        filter((value: string) => value.length > 2),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(result => this.getYoutubeVideos(result))
        );
  }

  public getYoutubeVideos(searchTerm: string, page?: number): Observable<any> {
    return this.httpClient.get(
      `${appConfig.youTubeEndpoint}?q=${searchTerm}&key=${appConfig.api_key}&maxResults=20&part=snippet&type=video`
      );
  }

  public getImages(searchTerm: string, page?: number): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    const options = { headers, responseType: 'json' };

    return this.httpClient.get(
      `${appConfig.customSearchEndpoint}?q=${searchTerm}&key=${appConfig.api_key}&searchType=image&cx=${appConfig.cx_id}`
    );
  }
}
