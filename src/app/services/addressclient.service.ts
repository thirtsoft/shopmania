import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AddressAddressClientService {

  /*
   apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }




  public getAddressClientDtos(): Observable<AddressClientDto[]> {
    return this.http.get<AddressClientDto[]>(`${this.apiServerUrl}/addresses/all`);
  }

  public getAddressClientDtosOrderByIdDesc(): Observable<AddressClientDto[]> {
    return this.http.get<AddressClientDto[]>(`${this.apiServerUrl}/addresses/searchAllAddressClientsOrderByIdDesc`);
  }

  public getAddressClientDtoById(addressClientId: number): Observable<AddressClientDto> {
    return this.http.get<AddressClientDto>(`${this.apiServerUrl}/addresses/${addressClientId}`);
  }

  public addAddressClientDto(addressClientDTO: AddressClientDto): Observable<AddressClientDto> {
    return this.http.post<AddressClientDto>(`${this.apiServerUrl}/addresses/create`, addressClientDTO);
  }

  public updateAddressClientDto(addressClientDTO: AddressClientDto): Observable<AddressClientDto> {
    return this.http.put<AddressClientDto>(`${this.apiServerUrl}/addresses/create`, addressClientDTO);
  }

  public deleteAddressClientDto(addressClientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/addresses/delete/${addressClientId}`);
  }

  */

}
