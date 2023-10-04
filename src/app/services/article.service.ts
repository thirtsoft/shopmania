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

  choixmenu : string  = 'A';
  listData : ArticleDto[];

  formData:  FormGroup;

  constructor(private http: HttpClient) {
  }

  public getAllActivesArticles(): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiServerUrl}/articles/search-all-active-articles`);
  }

  public getArticleDtoById(articleId: number): Observable<ArticleDto> {
    return this.http.get<ArticleDto>(`${this.apiServerUrl}/articles/findById/${articleId}`);
  }

  public getArticleDtoByReference(reference: string): Observable<ArticleDto> {
    return this.http.get<ArticleDto>(`${this.apiServerUrl}/articles/search-by-reference/${reference}`);
  }

  public addArticleDto(articleDTO: ArticleDto): Observable<ArticleDto> {
    return this.http.post<ArticleDto>(`${this.apiServerUrl}/articles/create`, articleDTO);
  }

  public addArticleDtoWithPhoto(formData: FormData): Observable<any> {
    const req = new HttpRequest('POST', `${this.apiServerUrl}/articles/create-with-file`, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  public addArticleDtoWithPhotoInFolder(formData: FormData): Observable<any> {
    const req = new HttpRequest('POST', `${this.apiServerUrl}/articles/create-with-file-in-folder`, formData, {
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
    const req = new HttpRequest('POST', this.apiServerUrl+'/articles/upload-photo-article/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  uploadPhotoArticleDtoInFolder(file: File, id: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.apiServerUrl+'/articles/upload-photo-article-in-folder/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

 
  public getPhotoArticle() {
    return this.http.get(`${this.apiServerUrl}/articles/photo-article`);
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
