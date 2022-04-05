import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AddressClient, AddressClientDto } from './../model/address-client';


@Injectable({
  providedIn: 'root'
})
export class AddressAddressClientService {

   apiServerUrl = environment.apiBaseUrl;

  // apiServerUrl = "https://businesse-admin.herokuapp.com/shop-mania/v1";

  constructor(private http: HttpClient) {
  }

  public getAddressClients(): Observable<AddressClient[]> {
    return this.http.get<AddressClient[]>(`${this.apiServerUrl}/addresses/all`);
  }

  public getAddressClientById(addressClientId: number): Observable<AddressClient> {
    return this.http.get<AddressClient>(`${this.apiServerUrl}/addresses/${addressClientId}`);
  }

  public addAddressClient(addressClient: AddressClient): Observable<AddressClient> {
    return this.http.post<AddressClient>(`${this.apiServerUrl}/addresses/create`, addressClient);
  }

  public updateAddressClient(addressClient: AddressClient): Observable<AddressClient> {
    return this.http.put<AddressClient>(`${this.apiServerUrl}/addresses/create`, addressClient);
  }

  public deleteAddressClient(addressClientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/addresses/delete/${addressClientId}`);
  }

  /****************************** AddressClientDTO ******************/

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


}
