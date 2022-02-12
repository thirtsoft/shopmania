import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AddressDto } from './../model/address';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  /******************** AddressDtos ****************/

  public getAddressDtos(): Observable<AddressDto[]> {
    return this.http.get<AddressDto[]>(`${this.apiServerUrl}/addresses/all`);
  }

  public getAddressDtosOrderByIdDesc(): Observable<AddressDto[]> {
    return this.http.get<AddressDto[]>(`${this.apiServerUrl}/addresses/searchAllAddressOrderByIdDesc`);
  }

  public getAddressDtoById(AddressId: number): Observable<AddressDto> {
    return this.http.get<AddressDto>(`${this.apiServerUrl}/addresses/findById/${AddressId}`);
  }

  public addAddressDto(AddressDto: AddressDto): Observable<AddressDto> {
    return this.http.post<AddressDto>(`${this.apiServerUrl}/addresses/create`, AddressDto);
  }

  public updateAddressDto(AddressDto: AddressDto): Observable<AddressDto> {
    return this.http.put<AddressDto>(`${this.apiServerUrl}/addresses/create`, AddressDto);
  }

  public deleteAddressDto(AddressId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/addresses/delete/${AddressId}`);
  }
}
