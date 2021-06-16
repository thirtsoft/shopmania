import { ArticleDto } from './../model/article';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

//  public apiServerUrl = environment.apiBaseUrl;

  public apiServerUrl = environment.apiBaseUrl;

//  public host:string="http://localhost:8080";
  public apiBaseUrl: 'http://localhost:8081/shop-mania/v1';

  constructor(private http: HttpClient) {
  }

  public getListArticleDTOBySelectedIsTrue(): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/searchArticleByselectedIsTrue`);
  }

  public getListArticleDTOByCategoryId(scatId: number): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/articlesByScategories/${scatId}`);
  }

  public getListArticleDTOByPageable(page: number, size: number): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/searchArticleByPageables?page=`+page+"&size="+size);
  }

  public getListArticleDTOByKeyword(keyword: string): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/searchArticleByKeyword?keyword=`+keyword);
  }


  public getListArticleDTOByScategoryByPageable(scatId: number, page: number, size: number): Observable<ArticleDto[]> {
    const searchUrl = (this.apiServerUrl+"/articles/searchArticleByScategoryByPageables?id="+scatId+"&page="+page+"&size="+size);
    console.log("Search Url---", searchUrl);
    return this.http.get<ArticleDto[]>(searchUrl);
 //   return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/searchArticleByScategoryByPageables/${scatId}?&page=`+page+"&size="+size);
  }

  public getPhotoArticle() {
    return this.http.get(`${this.apiServerUrl}/articles/photoArticle`);
  }


}
