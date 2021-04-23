import { Commande } from './../model/commande';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiServerUrl}/commandes/all`);
  }

  public getCommandeById(commandeId: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.apiServerUrl}/commandes/${commandeId}`);
  }

  public addCommande(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(`${this.apiServerUrl}/commandes/create`, commande);
  }

  public updateCommande(commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${this.apiServerUrl}/commandes/create`, commande);
  }

  public deleteCommande(commandeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/commandes/delete/${commandeId}`);
  }

}
