import { TokenStorageService } from './../auth/token-storage.service';
import { ArticleDto } from './../model/article';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  apiServerUrl = environment.apiBaseUrl;

  id: any;
  currentUser: any;
  username: any;


  constructor(private http: HttpClient,
            private tokenService: TokenStorageService
  ) {
  }

  public getListArticleDTOBySelectedIsTrue(): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/search-articles-by-selected-is-true`);
  }

  public getTop12ArticleDTOOrderByCreatedDateDesc(): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/search-top12-article-order-by-createdDate-desc`);
  }

  public getListArticleDTOByCategoryId(scatId: number): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/articles-by-subcategories/${scatId}`);
  }

  public getListArticleDTOByPageable(page: number, size: number): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/search-article-by-pageable?page=`+page+"&size="+size);
  }

  public getListArticleDTOByKeyword(keyword: string): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/search-article-by-keyword?keyword=`+keyword);
  }

  public getListArticleDTOBySamePrice(price: number): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/articlesByScategories/${price}`);
  }

  public getListArticleDTOByPricemMinMax(min: number, max: number): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/searchArticleByPriceMinMax/${min}/${max}`);
  }

  public getListArticleDTOByScategoryByPageable(scatId: number, page: number, size: number): Observable<ArticleDto[]> {
    const searchUrl = (this.apiServerUrl+"/articles/search-article-by-subcategory-by-pageable?id="+scatId+"&page="+page+"&size="+size);
    console.log("Search Url---", searchUrl);
    return this.http.get<ArticleDto[]>(searchUrl);
  }

  public getListArticleDTOBySamePriceByPageable(price: number, page: number, size: number): Observable<ArticleDto[]> {
    const searchbyPriceUrl = (this.apiServerUrl+"/articles/searchArticleBySamePriceByPageables?price="+price+"&page="+page+"&size="+size);
    console.log("Search Price Url---", searchbyPriceUrl);
    return this.http.get<ArticleDto[]>(searchbyPriceUrl);
  }

  public countNumberOfProductInSubCategory(sucatId: number): Observable<ArticleDto> {
    return this.http.get<ArticleDto>(`${this.apiServerUrl}/articles/count-number-of-article-in-subcategory/${sucatId}`);
  }

  public getPhotoArticle() {
    return this.http.get(`${this.apiServerUrl}/articles/photo-article`);
  }

  getCurrentUser(): Observable<any> {
    return this.tokenService.getUser();
  }

  getLogginUser() {
    const user = this.tokenService.getLogginUser();
    this.currentUser = user;
  }

  getUsername() {
    const user = this.tokenService.getUser();
    this.username = user.username;
  }


  getUserId() {
    const user = this.tokenService.getUser();
    this.id = user.id;
  }


}
