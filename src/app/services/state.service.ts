import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateDto } from './../model/state';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  apiServerUrl = environment.apiBaseUrl;

  choixmenu : string  = 'A';

  listData : StateDto[];

  formData:  StateDto;

  dataForm:  FormGroup;

  constructor(private http: HttpClient) {
  }

  public getStateDtoById(statId: number): Observable<StateDto> {
    return this.http.get<StateDto>(`${this.apiServerUrl}/states/findById/${statId}`);
  }

  public getAllActiveStates(): Observable<StateDto[]> {
    return this.http.get<StateDto[]>(`${this.apiServerUrl}/states/search-all-active-states`);
  }

  public addStateDto(stateDto: StateDto): Observable<StateDto> {
    return this.http.post<StateDto>(`${this.apiServerUrl}/states/create`, stateDto);
  }

  public updateStateDto(statId: number, stateDto: StateDto): Observable<StateDto> {
    return this.http.put<StateDto>(`${this.apiServerUrl}/states/update/${statId}`, stateDto);
  }


  public getListStateByCountryCode(code: string): Observable<StateDto[]> {
    return this.http.get<StateDto[]>(`${this.apiServerUrl}/states/search-state-by-country-code?code=`+code);
  }

  getStates(theCountryCode: string): Observable<any> {
    const searchStateUrl = `${this.apiServerUrl}/states/search-state-by-country-code?code=${theCountryCode}`;
    return this.http.get(searchStateUrl);
  }


  public deleteStateById(StateId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/states/delete-state/${StateId}`);
  }

}
