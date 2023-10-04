import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AddressLivraisonDto } from './../model/address';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddresslivraisonService {

  apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAddressLivraisonDtoById(addressLivraisonId: number): Observable<AddressLivraisonDto> {
    return this.http.get<AddressLivraisonDto>(`${this.apiServerUrl}/addresslivraisons/${addressLivraisonId}`);
  }

  public getAllActiveAddresses(): Observable<AddressLivraisonDto[]> {
    return this.http.get<AddressLivraisonDto[]>(`${this.apiServerUrl}/addresslivraisons/search-all-active-addresslivraisons`);
  }

  public deleteAddressById(subCatId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/addresslivraisons/delete-addresslivraisons/${subCatId}`);
  }

}
