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

  /***********************  CommandeDTO ***********/

  public getCommandeDtos(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/all`);
  }

  public getCommandeDtoById(comId: number): Observable<CommandeDto> {
    return this.http.get<CommandeDto>(`${this.apiServerUrl}/commandes/${comId}`);
  }

  public addCommandeDto(commandeDTO: CommandeDto): Observable<CommandeDto> {
    return this.http.post<CommandeDto>(`${this.apiServerUrl}/commandes/create`, commandeDTO);
  }

  public updateCommandeDto(comId: number, commandeDTO: CommandeDto): Observable<CommandeDto> {
    return this.http.put<CommandeDto>(`${this.apiServerUrl}/articles/update/${comId}`, commandeDTO);
  }

  public deleteCommandeDto(commandeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/commandes/delete/${commandeId}`);
  }

}
