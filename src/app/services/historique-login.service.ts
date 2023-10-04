import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { HistoriqueLoginDto } from './../model/historique-login';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueLoginService {
  
  apiServerUrl = environment.apiBaseUrl;

  public choixmenu : string  = 'A';

  public dataForm:  FormGroup;

  listData : HistoriqueLoginDto[];

  formData:  HistoriqueLoginDto;

  constructor(private http: HttpClient) {
  }

  public getAllActiveHistoriqueLogins(): Observable<HistoriqueLoginDto[]> {
    return this.http.get<HistoriqueLoginDto[]>(`${this.apiServerUrl}/historiqueLogins/search-all-active-historiqueLogins`);
  }
  
  public deleteHistoriqueLoginById(subCatId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/historiqueLogins/delete-historiqueLogin/${subCatId}`);
  }

}
