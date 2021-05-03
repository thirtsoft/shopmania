import { Fournisseur } from './../model/fournisseur';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private apiServerUrl = environment.apiBaseUrl;

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

}