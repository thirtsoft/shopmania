import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { Fournisseur, FournisseurDto } from './../model/fournisseur';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

//  private apiServerUrl = environment.apiBaseUrl;

  public apiServerUrl = "https://businesse-admin.herokuapp.com/shop-mania/v1";

  choixmenu : string  = 'A';
  listData : Fournisseur[];
  formData:  Fournisseur;

  dataForm:  FormGroup;

  constructor(private http: HttpClient) {
  }

  public getFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.apiServerUrl}/fournisseurs/all`);
  }

  public getFournisseurById(fournisseurId: number): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(`${this.apiServerUrl}/fournisseurs/${fournisseurId}`);
  }

  public addFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(`${this.apiServerUrl}/fournisseurs/create`, fournisseur);
  }

  public updateFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.put<Fournisseur>(`${this.apiServerUrl}/fournisseurs/create`, fournisseur);
  }

  public deleteFournisseur(fournisseurId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/fournisseurs/delete/${fournisseurId}`);
  }

  /**************** FournisseurDTO  *******/

  public getFournisseurDTOs(): Observable<FournisseurDto[]> {
    return this.http.get<FournisseurDto[]>(`${this.apiServerUrl}/fournisseurs/all`);
  }

  public getFournisseurDTOsOrderByIdDesc(): Observable<FournisseurDto[]> {
    return this.http.get<FournisseurDto[]>(`${this.apiServerUrl}/fournisseurs/searchAllFournisseursOrderByIdDesc`);
  }

  public getFournisseurDtoById(fournisseurId: number): Observable<FournisseurDto> {
    return this.http.get<FournisseurDto>(`${this.apiServerUrl}/fournisseurs/${fournisseurId}`);
  }

  public addFournisseurDto(fournisseurDTO: FournisseurDto): Observable<FournisseurDto> {
    return this.http.post<FournisseurDto>(`${this.apiServerUrl}/fournisseurs/create`, fournisseurDTO);
  }

  public updateFournisseurDto(fournisseurId: number, fournisseurDTO: FournisseurDto): Observable<FournisseurDto> {
    return this.http.put<FournisseurDto>(`${this.apiServerUrl}/fournisseurs/update/${fournisseurId}`, fournisseurDTO);
  }

  public deleteFournisseurDto(fournisseurId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/fournisseurs/delete/${fournisseurId}`);
  }


}
