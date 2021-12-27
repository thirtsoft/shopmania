import { HttpClient } from '@angular/common/http';
import { AddressClient, AddressClientDto } from './../model/address-client';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressAddressClientService {

//  private apiServerUrl = environment.apiBaseUrl;

  public apiServerUrl = "https://businesse-admin.herokuapp.com/shop-mania/v1";

  constructor(private http: HttpClient) {
  }

  public getAddressClients(): Observable<AddressClient[]> {
    return this.http.get<AddressClient[]>(`${this.apiServerUrl}/addresseclients/all`);
  }

  public getAddressClientById(addressClientId: number): Observable<AddressClient> {
    return this.http.get<AddressClient>(`${this.apiServerUrl}/addresseclients/${addressClientId}`);
  }

  public addAddressClient(addressClient: AddressClient): Observable<AddressClient> {
    return this.http.post<AddressClient>(`${this.apiServerUrl}/addresseclients/create`, addressClient);
  }

  public updateAddressClient(addressClient: AddressClient): Observable<AddressClient> {
    return this.http.put<AddressClient>(`${this.apiServerUrl}/addresseclients/create`, addressClient);
  }

  public deleteAddressClient(addressClientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/addresseclients/delete/${addressClientId}`);
  }

  /****************************** AddressClientDTO ******************/

  public getAddressClientDtos(): Observable<AddressClientDto[]> {
    return this.http.get<AddressClientDto[]>(`${this.apiServerUrl}/addresseclients/all`);
  }

  public getAddressClientDtosOrderByIdDesc(): Observable<AddressClientDto[]> {
    return this.http.get<AddressClientDto[]>(`${this.apiServerUrl}/addresseclients/searchAllAddressClientsOrderByIdDesc`);
  }

  public getAddressClientDtoById(addressClientId: number): Observable<AddressClientDto> {
    return this.http.get<AddressClientDto>(`${this.apiServerUrl}/addresseclients/${addressClientId}`);
  }

  public addAddressClientDto(addressClientDTO: AddressClientDto): Observable<AddressClientDto> {
    return this.http.post<AddressClientDto>(`${this.apiServerUrl}/addresseclients/create`, addressClientDTO);
  }

  public updateAddressClientDto(addressClientDTO: AddressClientDto): Observable<AddressClientDto> {
    return this.http.put<AddressClientDto>(`${this.apiServerUrl}/addresseclients/create`, addressClientDTO);
  }

  public deleteAddressClientDto(addressClientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/addresseclients/delete/${addressClientId}`);
  }


}
