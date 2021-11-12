
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { CountryDto } from './../model/country';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  /***************************** CountryDTO    *************/

  public getCountryDTOs(): Observable<CountryDto[]> {
    return this.http.get<CountryDto[]>(`${this.apiServerUrl}/countries/all`);
  }

  public getAllCountryDTOsOrderByIdDesc(): Observable<CountryDto[]> {
    return this.http.get<CountryDto[]>(`${this.apiServerUrl}/countries/searchAllCountryOrderByIdDesc`);
  }

  public getCountryDtoById(countId: number): Observable<CountryDto> {
    return this.http.get<CountryDto>(`${this.apiServerUrl}/countries/${countId}`);
  }

  public getCountryDtoByDesignation(designation: string): Observable<CountryDto> {
    return this.http.get<CountryDto>(`${this.apiServerUrl}/countries/${designation}`);
  }

  public addCountryDto(countryDto: CountryDto): Observable<CountryDto> {
    return this.http.post<CountryDto>(`${this.apiServerUrl}/countries/create`, countryDto);
  }

  public updateCountryDto(categoryId: number, countryDto: CountryDto): Observable<CountryDto> {
    return this.http.put<CountryDto>(`${this.apiServerUrl}/countries/update/${categoryId}`, countryDto);
  }

  public deleteCountryDto(countId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/countries/delete/${countId}`);
  }

}
