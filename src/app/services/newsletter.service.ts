import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { Newsletter, NewsletterDto } from './../model/newsletter';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  apiServerUrl = environment.apiBaseUrl;


  //apiServerUrl = "https://businesse-admin.herokuapp.com/shop-mania/v1";

  choixmenu : string  = 'A';
  listData : Newsletter[];
  formData:  Newsletter;

  dataForm:  FormGroup;

  constructor(private http: HttpClient) {
  }

  /************************ NewsletterDto *******************/

  public getNewsletterDTOs(): Observable<NewsletterDto[]> {
    return this.http.get<NewsletterDto[]>(`${this.apiServerUrl}/newsletters/all`);
  }

  public getNewsletterDTOOrderByIdDesc(): Observable<NewsletterDto[]> {
    return this.http.get<NewsletterDto[]>(`${this.apiServerUrl}/newsletters/searchAllNewslettersOrderByIdDesc`);
  }

  public getNewsletterDTOById(newId: number): Observable<NewsletterDto> {
    return this.http.get<NewsletterDto>(`${this.apiServerUrl}/newsletters/findById/${newId}`);
  }

  public addNewsletterDTO(newsletterDto: NewsletterDto): Observable<NewsletterDto> {
    return this.http.post<NewsletterDto>(`${this.apiServerUrl}/newsletters/create`, newsletterDto);
  }


  public deleteNewsletterDTO(newId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/newsletters/delete/${newId}`);
  }

  public countNumberOfNewsletter(): Observable<NewsletterDto[]> {
    return this.http.get<NewsletterDto[]>(`${this.apiServerUrl}/newsletters/countNumberOfNewsletters`);
  }

  public getAllActiveNewsletters(): Observable<NewsletterDto[]> {
    return this.http.get<NewsletterDto[]>(`${this.apiServerUrl}/newsletters/search-all-active-newsletters`);
  }

  public deleteNewsletterById(subCatId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/newsletters/delete-newsletters/${subCatId}`);
  }


}
