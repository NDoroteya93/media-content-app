import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import appConfig from '../../config/main.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private httpClient: HttpClient) { }

  public getYoutubeVideos(searchTerm: string, page: number): Observable<any> {
    return this.httpClient.get(
      `${appConfig.youTubeEndpoint}?q=${searchTerm}&key=${appConfig.api_key}&maxResults=20&part=snippet&type=video`
      );
  }

  public getImages(searchTerm: string, page: number): Observable<any> {
    return this.httpClient.get(
      `${appConfig.customSearchEndpoint}?q=${searchTerm}&key=${appConfig.api_key}&searchType=image&cx=${appConfig.cx_id}`
    );
  }
}
