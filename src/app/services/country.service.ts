import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CountryDto } from './../model/country';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  apiServerUrl = environment.apiBaseUrl;

  public choixmenu : string  = 'A';

  public dataForm:  FormGroup;

  constructor(private http: HttpClient) {
  }

  public getCountryDtoById(countId: number): Observable<CountryDto> {
    return this.http.get<CountryDto>(`${this.apiServerUrl}/countries/findById/${countId}`);
  }

  public addCountryDto(countryDto: CountryDto): Observable<CountryDto> {
    return this.http.post<CountryDto>(`${this.apiServerUrl}/countries/create`, countryDto);
  }

  public updateCountryDto(categoryId: number, countryDto: CountryDto): Observable<CountryDto> {
    return this.http.put<CountryDto>(`${this.apiServerUrl}/countries/update/${categoryId}`, countryDto);
  }

  public getAllActiveCountries(): Observable<CountryDto[]> {
    return this.http.get<CountryDto[]>(`${this.apiServerUrl}/countries/search-all-active-countries`);
  }

  public deleteCountry(countryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/countries/delete-country/${countryId}`);
  }

}
