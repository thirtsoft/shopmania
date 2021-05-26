import { Observable } from 'rxjs';
import { AddressLivraison, AddressLivraisonDto } from './../model/address-livraison';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddresslivraisonService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAddressLivraisons(): Observable<AddressLivraison[]> {
    return this.http.get<AddressLivraison[]>(`${this.apiServerUrl}/addresslivraisons/all`);
  }

  public getAddressLivraisonById(addressLivraisonId: number): Observable<AddressLivraison> {
    return this.http.get<AddressLivraison>(`${this.apiServerUrl}/addresslivraisons/${addressLivraisonId}`);
  }

  public addAddressLivraison(addressLivraison: AddressLivraison): Observable<AddressLivraison> {
    return this.http.post<AddressLivraison>(`${this.apiServerUrl}/addresslivraisons/create`, addressLivraison);
  }

  public updateAddressLivraison(addressLivraison: AddressLivraison): Observable<AddressLivraison> {
    return this.http.put<AddressLivraison>(`${this.apiServerUrl}/addresslivraisons/create`, addressLivraison);
  }

  public deleteAddressLivraison(addressLivraisonId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/addresslivraisons/delete/${addressLivraisonId}`);
  }

  /******************** AddressLivraisonDTOs ****************/

  public getAddressLivraisonDtos(): Observable<AddressLivraisonDto[]> {
    return this.http.get<AddressLivraisonDto[]>(`${this.apiServerUrl}/addresslivraisons/all`);
  }

  public getAddressLivraisonDtoById(addressLivraisonId: number): Observable<AddressLivraisonDto> {
    return this.http.get<AddressLivraisonDto>(`${this.apiServerUrl}/addresslivraisons/${addressLivraisonId}`);
  }

  public addAddressLivraisonDto(addressLivraisonDTO: AddressLivraisonDto): Observable<AddressLivraisonDto> {
    return this.http.post<AddressLivraisonDto>(`${this.apiServerUrl}/addresslivraisons/create`, addressLivraisonDTO);
  }

  public updateAddressLivraisonDto(addressLivraisonDTO: AddressLivraisonDto): Observable<AddressLivraisonDto> {
    return this.http.put<AddressLivraisonDto>(`${this.apiServerUrl}/addresslivraisons/create`, addressLivraisonDTO);
  }

  public deleteAddressLivraisonDto(addressLivraisonId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/addresslivraisons/delete/${addressLivraisonId}`);
  }


}
