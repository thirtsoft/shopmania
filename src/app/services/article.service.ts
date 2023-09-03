import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Article, ArticleDto } from './../model/article';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  apiServerUrl = environment.apiBaseUrl;

 // apiServerUrl = "http://62.171.128.8:8081/shop-mania/v1";

  //apiServerUrl = "https://businesse-admin.herokuapp.com/shop-mania/v1";

  choixmenu : string  = 'A';
  listData : ArticleDto[];

  formData:  FormGroup;

  constructor(private http: HttpClient) {
  }

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiServerUrl}/articles/all`);
  }

  public getArticleById(articleId: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiServerUrl}/articles/findById/${articleId}`);
  }

  public getArticleByReference(reference: string): Observable<Article> {
    return this.http.get<Article>(`${this.apiServerUrl}/articles/${reference}`);
  }

  public addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${this.apiServerUrl}/articles/create`, article);
  }

  public updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiServerUrl}/articles/create`, article);
  }

  public deleteArticle(articleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/articles/delete/${articleId}`);
  }

  /************   ArticleDTO  ***************/

  public getArticleDTOs(): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/all`);
  }

  public getArticleDTOsOrderByIdDesc(): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/searchAllArticleOrderByIdDesc`);
  }

  public getAllActivesArticlesOrderByDesignation(): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/search-all-active-articles`);
  }

  public getArticleDtoById(articleId: number): Observable<ArticleDto> {
    return this.http.get<ArticleDto>(`${this.apiServerUrl}/articles/findById/${articleId}`);
  }

  public getArticleDtoByReference(reference: string): Observable<ArticleDto> {
    return this.http.get<ArticleDto>(`${this.apiServerUrl}/articles/searchbyReference/${reference}`);
  }

  public addArticleDto(articleDTO: ArticleDto): Observable<ArticleDto> {
    return this.http.post<ArticleDto>(`${this.apiServerUrl}/articles/create`, articleDTO);
  }

  public addArticleDtoWithPhoto(formData: FormData): Observable<any> {
    const req = new HttpRequest('POST', `${this.apiServerUrl}/articles/createWithFile`, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  public addArticleDtoWithPhotoInFolder(formData: FormData): Observable<any> {
    const req = new HttpRequest('POST', `${this.apiServerUrl}/articles/createWithFileInFolder`, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }


  public updateArticleDto(articleId: number, articleDTO: ArticleDto): Observable<ArticleDto> {
    return this.http.put<ArticleDto>(`${this.apiServerUrl}/articles/update/${articleId}`, articleDTO);
  }

  uploadPhotoArticleDto(file: File, id: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.apiServerUrl+'/articles/uploadArticlePhoto/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  uploadPhotoArticleDtoInFolder(file: File, id: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.apiServerUrl+'/articles/uploadArticlePhotoInFolder/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public getPhotoArticle() {
    return this.http.get(`${this.apiServerUrl}/articles/photoArticle`);
  }

  public deleteArticleDto(articleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/articles/delete/${articleId}`);
  }

  public deleteArticleById(articleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/articles/delete-article/${articleId}`);
  }


  incrementQuantityArticleDTO(articleDTO: ArticleDto) {
    articleDTO.quantite++;

  }

  decrementQuantityArticleDTO(articleDTO: ArticleDto) {
    articleDTO.quantite--;

  }



}
