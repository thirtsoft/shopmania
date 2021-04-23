import { LigneCommande } from './../model/ligne-commande';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LigneLigneCommandeService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getLigneCommandes(): Observable<LigneCommande[]> {
    return this.http.get<LigneCommande[]>(`${this.apiServerUrl}/ligneLigneCommandes/all`);
  }

  public getLigneCommandeById(ligneCommandeId: number): Observable<LigneCommande> {
    return this.http.get<LigneCommande>(`${this.apiServerUrl}/ligneLigneCommandes/${ligneCommandeId}`);
  }

  public addLigneCommande(ligneCommande: LigneCommande): Observable<LigneCommande> {
    return this.http.post<LigneCommande>(`${this.apiServerUrl}/ligneLigneCommandes/create`, ligneCommande);
  }

  public updateLigneCommande(ligneCommande: LigneCommande): Observable<LigneCommande> {
    return this.http.put<LigneCommande>(`${this.apiServerUrl}/ligneLigneCommandes/create`, ligneCommande);
  }

  public deleteLigneCommande(ligneCommandeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/ligneLigneCommandes/delete/${ligneCommandeId}`);
  }

}
