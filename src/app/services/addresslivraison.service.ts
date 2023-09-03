<<<<<<< HEAD
import { Observable } from 'rxjs';
import { AddressLivraison, AddressLivraisonDto } from './../model/address-livraison';
import { HttpClient } from '@angular/common/http';
=======
>>>>>>> 4231753cd853621d39b3224c77bfa079433fa590
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AddressLivraisonDto } from './../model/address';

import { environment } from 'src/environments/environment';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddresslivraisonService {

  apiServerUrl = environment.apiBaseUrl;
<<<<<<< HEAD


  //apiServerUrl = "https://businesse-admin.herokuapp.com/shop-mania/v1";
=======
>>>>>>> 4231753cd853621d39b3224c77bfa079433fa590

  constructor(private http: HttpClient) {
  }

  public getAddressLivraisonDtos(): Observable<AddressLivraisonDto[]> {
    return this.http.get<AddressLivraisonDto[]>(`${this.apiServerUrl}/addresslivraisons/all`);
  }

  public getAddressLivraisonDtosOrderByIdDesc(): Observable<AddressLivraisonDto[]> {
    return this.http.get<AddressLivraisonDto[]>(`${this.apiServerUrl}/addresslivraisons/searchAllAddressLivraisonsOrderByIdDesc`);
  }

  public getAddressLivraisonDtoById(addressLivraisonId: number): Observable<AddressLivraisonDto> {
    return this.http.get<AddressLivraisonDto>(`${this.apiServerUrl}/addresslivraisons/${addressLivraisonId}`);
  }

  public addAddressLivraisonDto(addressLivraisonDTO: AddressLivraisonDto): Observable<AddressLivraisonDto> {
    return this.http.post<AddressLivraisonDto>(`${this.apiServerUrl}/addresslivraisons/create`, addressLivraisonDTO);
  }

  public updateAddressLivraisonDto(addressLivraisonId: number, addressLivraisonDTO: AddressLivraisonDto): Observable<AddressLivraisonDto> {
    return this.http.put<AddressLivraisonDto>(`${this.apiServerUrl}/addresslivraisons/update/${addressLivraisonId}`, addressLivraisonDTO);
  }

  public deleteAddressLivraisonDto(addressLivraisonId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/addresslivraisons/delete/${addressLivraisonId}`);
  }

  public getAllActiveAddresses(): Observable<AddressLivraisonDto[]> {
    return this.http.get<AddressLivraisonDto[]>(`${this.apiServerUrl}/addresslivraisons/search-all-active-addresslivraisons`);
  }

  public deleteAddressById(subCatId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/addresslivraisons/delete-addresslivraisons/${subCatId}`);
  }

}
