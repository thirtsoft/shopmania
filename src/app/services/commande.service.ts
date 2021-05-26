import { Commande, CommandeDto } from './../model/commande';
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

  /***********************  CommandeDTO ***********/

  public getCommandeDtos(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/all`);
  }

  public getCommandeDtoById(commandeId: number): Observable<CommandeDto> {
    return this.http.get<Commande>(`${this.apiServerUrl}/commandes/${commandeId}`);
  }

  public addCommandeDto(commandeDTO: CommandeDto): Observable<CommandeDto> {
    return this.http.post<CommandeDto>(`${this.apiServerUrl}/commandes/create`, commandeDTO);
  }

  public updateCommandeDto(commandeDTO: CommandeDto): Observable<CommandeDto> {
    return this.http.put<CommandeDto>(`${this.apiServerUrl}/commandes/create`, commandeDTO);
  }

  public deleteCommandeDto(commandeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/commandes/delete/${commandeId}`);
  }

}
