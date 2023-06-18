import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Address, AddressDto } from './../model/address';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddresslivraisonService {

  apiServerUrl = environment.apiBaseUrl;


  //apiServerUrl = "https://businesse-admin.herokuapp.com/shop-mania/v1";

  constructor(private http: HttpClient) {
  }

  public getAddressLivraisons(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiServerUrl}/addresses/all`);
  }

  public getAddressLivraisonById(addressLivraisonId: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiServerUrl}/addresses/${addressLivraisonId}`);
  }

  public addAddressLivraison(addressLivraison: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiServerUrl}/addresses/create`, addressLivraison);
  }

  public updateAddressLivraison(addressLivraison: Address): Observable<Address> {
    return this.http.put<Address>(`${this.apiServerUrl}/addresses/create`, addressLivraison);
  }

  public deleteAddressLivraison(addressLivraisonId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/addresses/delete/${addressLivraisonId}`);
  }

  /******************** AddressLivraisonDTOs ****************/

  public getAddressLivraisonDtos(): Observable<AddressDto[]> {
    return this.http.get<AddressDto[]>(`${this.apiServerUrl}/addresses/all`);
  }

  public getAddressLivraisonDtosOrderByIdDesc(): Observable<AddressDto[]> {
    return this.http.get<AddressDto[]>(`${this.apiServerUrl}/addresses/searchAllAddressLivraisonsOrderByIdDesc`);
  }

  public getAddressLivraisonDtoById(addressLivraisonId: number): Observable<AddressDto> {
    return this.http.get<AddressDto>(`${this.apiServerUrl}/addresses/${addressLivraisonId}`);
  }

  public addAddressLivraisonDto(addressLivraisonDTO: AddressDto): Observable<AddressDto> {
    return this.http.post<AddressDto>(`${this.apiServerUrl}/addresses/create`, addressLivraisonDTO);
  }

  public updateAddressLivraisonDto(addressLivraisonDTO: AddressDto): Observable<AddressDto> {
    return this.http.put<AddressDto>(`${this.apiServerUrl}/addresses/create`, addressLivraisonDTO);
  }

  public deleteAddressLivraisonDto(addressLivraisonId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/addresses/delete/${addressLivraisonId}`);
  }

  public getAllActiveAddresses(): Observable<AddressDto[]> {
    return this.http.get<AddressDto[]>(`${this.apiServerUrl}/addresses/search-all-active-addresses`);
  }

  public deleteAddressById(subCatId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/addresses/delete-addresse/${subCatId}`);
  }


}
