import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { Newsletter, NewsletterDto } from './../model/newsletter';

import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  apiServerUrl = environment.apiBaseUrl;

  choixmenu : string  = 'A';
  listData : Newsletter[];
  formData:  Newsletter;

  dataForm:  FormGroup;

  constructor(private http: HttpClient) {
  }


  public getNewsletterDTOById(newId: number): Observable<NewsletterDto> {
    return this.http.get<NewsletterDto>(`${this.apiServerUrl}/newsletters/findById/${newId}`);
  }

  public addNewsletterDTO(newsletterDto: NewsletterDto): Observable<NewsletterDto> {
    return this.http.post<NewsletterDto>(`${this.apiServerUrl}/newsletters/create`, newsletterDto);
  }


  public countNumberOfNewsletter(): Observable<NewsletterDto[]> {
    return this.http.get<NewsletterDto[]>(`${this.apiServerUrl}/newsletters/count-number-of-newsletters`);
  }

  public getAllActiveNewsletters(): Observable<NewsletterDto[]> {
    return this.http.get<NewsletterDto[]>(`${this.apiServerUrl}/newsletters/search-all-active-newsletters`);
  }

  public deleteNewsletterById(subCatId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/newsletters/delete-newsletters/${subCatId}`);
  }


}
