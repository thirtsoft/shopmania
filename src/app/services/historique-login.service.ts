import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { HistoriqueLoginDto } from './../model/historique-login';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueLoginService {

  private apiServerUrl = environment.apiBaseUrl;


    public choixmenu : string  = 'A';

    public dataForm:  FormGroup;

    listData : HistoriqueLoginDto[];

    formData:  HistoriqueLoginDto;

    constructor(private http: HttpClient) {
    }

    /********************* HistoriqueLoginDto ******************/

    public getHistoriqueLoginDtos(): Observable<HistoriqueLoginDto[]> {
      return this.http.get<HistoriqueLoginDto[]>(`${this.apiServerUrl}/historiqueLogins/all`);
    }

    public getALLHistoriqueLoginDtosOrderByIdDesc(): Observable<HistoriqueLoginDto[]> {
      return this.http.get<HistoriqueLoginDto[]>(`${this.apiServerUrl}/historiqueLogins/searchAllHistoriqueLoginsOrderByIdDesc`);
    }

    public getHistoriqueLoginDtoById(logHistoriqueId: number): Observable<HistoriqueLoginDto> {
      return this.http.get<HistoriqueLoginDto>(`${this.apiServerUrl}/historiqueLogins/findById/${logHistoriqueId}`);
    }

    public addHistoriqueLoginDto(HistoriqueLoginDto: HistoriqueLoginDto): Observable<HistoriqueLoginDto> {
      return this.http.post<HistoriqueLoginDto>(`${this.apiServerUrl}/historiqueLogins/create`, HistoriqueLoginDto);
    }

    public updateHistoriqueLoginDto(scategoryId: number, HistoriqueLoginDto: HistoriqueLoginDto): Observable<HistoriqueLoginDto> {
      return this.http.put<HistoriqueLoginDto>(`${this.apiServerUrl}/historiqueLogins/update/${scategoryId}`, HistoriqueLoginDto);
    }

    public deleteHistoriqueLoginDto(scategoryId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/historiqueLogins/delete/${scategoryId}`);
    }

}
