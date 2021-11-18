import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { EmailDto } from './../model/email';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private baseUrl = environment.apiBaseUrl;

  choixmenu : string  = 'A';
  listData : EmailDto[];
  formData : EmailDto;

  public dataForm:  FormGroup;


  constructor(private http: HttpClient) { }

  getAllEmailDTOs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/emails`);
  }

  public getFournisseurById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/fournisseurs/${id}`);
  }

  public sendEmailDTO(info: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/emails/sendEmail`, info);
  }

  public sendMailDTO(info: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/emails/sendMail`, info);
  }

  public sendMailToAllFournisseur(info: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/sendMailToAllFournisseur`, info);
  }

  public sendMailToCustomer(info: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/sendMailToCustomer`, info);
  }

  deleteFournisseur(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/emails/${id}`, { responseType: 'text' });
  }

}
