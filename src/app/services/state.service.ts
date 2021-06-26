import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { StateDto } from './../model/state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  /***************************** StateDTO    *************/

  public getStateDTOs(): Observable<StateDto[]> {
    return this.http.get<StateDto[]>(`${this.apiServerUrl}/states/all`);
  }

  public getStateDtoById(statId: number): Observable<StateDto> {
    return this.http.get<StateDto>(`${this.apiServerUrl}/states/${statId}`);
  }

  public getStateDtoByDesignation(designation: string): Observable<StateDto> {
    return this.http.get<StateDto>(`${this.apiServerUrl}/states/${designation}`);
  }

  public addStateDto(stateDto: StateDto): Observable<StateDto> {
    return this.http.post<StateDto>(`${this.apiServerUrl}/states/create`, stateDto);
  }

  public updateStateDto(statId: number, stateDto: StateDto): Observable<StateDto> {
    return this.http.put<StateDto>(`${this.apiServerUrl}/states/update/${statId}`, stateDto);
  }

  public deleteStateDto(statId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/states/delete/${statId}`);
  }

}
