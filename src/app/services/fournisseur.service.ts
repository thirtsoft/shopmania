import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { Fournisseur, FournisseurDto } from './../model/fournisseur';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  apiServerUrl = environment.apiBaseUrl;

  choixmenu : string  = 'A';
  listData : Fournisseur[];
  formData:  Fournisseur;

  dataForm:  FormGroup;

  constructor(private http: HttpClient) {
  }


  public getFournisseurDtoById(fournisseurId: number): Observable<FournisseurDto> {
    return this.http.get<FournisseurDto>(`${this.apiServerUrl}/fournisseurs/findById/${fournisseurId}`);
  }

  public addFournisseurDto(fournisseurDTO: FournisseurDto): Observable<FournisseurDto> {
    return this.http.post<FournisseurDto>(`${this.apiServerUrl}/fournisseurs/create`, fournisseurDTO);
  }

  public updateFournisseurDto(fournisseurId: number, fournisseurDTO: FournisseurDto): Observable<FournisseurDto> {
    return this.http.put<FournisseurDto>(`${this.apiServerUrl}/fournisseurs/update/${fournisseurId}`, fournisseurDTO);
  }


  public getAllActiveFournisseurs(): Observable<FournisseurDto[]> {
    return this.http.get<FournisseurDto[]>(`${this.apiServerUrl}/fournisseurs/search-all-active-fournisseurs`);
  }

  public deleteFournisseurById(subCatId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/fournisseurs/delete-fournisseur/${subCatId}`);
  }


}
