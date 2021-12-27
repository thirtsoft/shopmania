import { Injectable } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';

import { BlogDto } from './../model/blog';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

 // public apiServerUrl = environment.apiBaseUrl;

  apiServerUrl: 'https://businesse-admin.herokuapp.com/shop-mania/v1';

  choixmenu : string  = 'A';
  listData : BlogDto[];

  formData:  FormGroup;

  constructor(private http: HttpClient) {
  }

   /************   BlogDto  ***************/

   public getBlogDtos(): Observable<BlogDto[]> {
    return this.http.get<BlogDto[]>(`${this.apiServerUrl}/blogs/all`);
  }

  public getBlogDtosOrderByIdDesc(): Observable<BlogDto[]> {
    return this.http.get<BlogDto[]>(`${this.apiServerUrl}/blogs/searchAllBlogOrderByIdDesc`);
  }

  public getTop5BlogDTOsOrderByCreatedDateDesc(): Observable<BlogDto[]> {
    return this.http.get<BlogDto[]>(`${this.apiServerUrl}/blogs/searchTop5BlogOrderByCreatedDateDesc`);
  }

  public getBlogDtoById(blogId: number): Observable<BlogDto> {
    return this.http.get<BlogDto>(`${this.apiServerUrl}/blogs/findById/${blogId}`);
  }

  public getBlogDtoByTitle(title: string): Observable<BlogDto> {
    return this.http.get<BlogDto>(`${this.apiServerUrl}/blogs/searchbyTitle/${title}`);
  }

  public addBlogDto(blogDto: BlogDto): Observable<BlogDto> {
    return this.http.post<BlogDto>(`${this.apiServerUrl}/blogs/create`, blogDto);
  }

  public addBlogDtoWithPhoto(formData: FormData): Observable<any> {
    const req = new HttpRequest('POST', `${this.apiServerUrl}/blogs/createBlogWithFile`, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }


  public updateBlogDto(blogId: number, blogDto: BlogDto): Observable<BlogDto> {
    return this.http.put<BlogDto>(`${this.apiServerUrl}/blogs/update/${blogId}`, blogDto);
  }

  public getPhotoBlog() {
    return this.http.get(`${this.apiServerUrl}/blogs/photoBlog`);
  }

  uploadPhotoBlogDto(file: File, id: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.apiServerUrl+'/blogs/uploadBlogPhoto/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public deleteBlogDto(blogId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/blogs/delete/${blogId}`);
  }



}
