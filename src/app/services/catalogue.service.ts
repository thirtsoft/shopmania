import { ArticleDto } from './../model/article';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public apiServerUrl = environment.apiBaseUrl;

//  public host:string="http://localhost:8080";
  public apiBaseUrl: 'http://localhost:8081/shop-mania/v1';

  constructor(private http: HttpClient) {
  }

  public getPhotoArticle() {
  /*   return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/photoArticle`); */
    return this.http.get<ArticleDto>(this.apiBaseUrl+"/photoArticle");
  }


}
