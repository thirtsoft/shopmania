import { TokenStorageService } from './../auth/token-storage.service';
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

  id: any;
  currentUser: any;
  username: any;

//  public host:string="http://localhost:8080";
  public apiBaseUrl: 'http://localhost:8081/shop-mania/v1';

  constructor(private http: HttpClient,
              private tokenService: TokenStorageService) {
  }

  public getListArticleDTOBySelectedIsTrue(): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/searchArticleByselectedIsTrue`);
  }

  public getTop12ArticleDTOOrderByCreatedDateDesc(): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/searchTop12ArticleOrderByCreatedDateDesc`);
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

  public getListArticleDTOBySamePrice(price: number): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/articlesByScategories/${price}`);
  }

  public getListArticleDTOByPricemMinMax(min: number, max: number): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/searchArticleByPriceMinMax/${min}/${max}`);
  }


  public getListArticleDTOByScategoryByPageable(scatId: number, page: number, size: number): Observable<ArticleDto[]> {
    const searchUrl = (this.apiServerUrl+"/articles/searchArticleByScategoryByPageables?id="+scatId+"&page="+page+"&size="+size);
    console.log("Search Url---", searchUrl);
    return this.http.get<ArticleDto[]>(searchUrl);
 //   return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/searchArticleByScategoryByPageables/${scatId}?&page=`+page+"&size="+size);
  }

  public getListArticleDTOBySamePriceByPageable(price: number, page: number, size: number): Observable<ArticleDto[]> {
    const searchbyPriceUrl = (this.apiServerUrl+"/articles/searchArticleBySamePriceByPageables?price="+price+"&page="+page+"&size="+size);
    console.log("Search Price Url---", searchbyPriceUrl);
    return this.http.get<ArticleDto[]>(searchbyPriceUrl);
  }

  public getPhotoArticle() {
    return this.http.get(`${this.apiServerUrl}/articles/photoArticle`);
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
    this.id = user.id
    /* this.authService.getUserById(this.id).subscribe(arg => {
      this.currentUser = arg;
      console.log(this.currentUser);
    });
    ; */
  }


}
