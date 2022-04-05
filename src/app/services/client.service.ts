import { Client, ClientDto } from './../model/client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiServerUrl = environment.apiBaseUrl;

  //apiServerUrl = "https://businesse-admin.herokuapp.com/shop-mania/v1";

  constructor(private http: HttpClient) {
  }

  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiServerUrl}/clients/all`);
  }

  public getClientById(clientId: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiServerUrl}/clients/findById/${clientId}`);
  }

  public addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiServerUrl}/clients/create`, client);
  }

  public updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiServerUrl}/clients/create`, client);
  }

  public deleteClient(clientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/clients/delete/${clientId}`);
  }

  /************************ ClientDTO *******************/

  public getClientDTOs(): Observable<ClientDto[]> {
    return this.http.get<ClientDto[]>(`${this.apiServerUrl}/clients/all`);
  }

  public getClientDTOsOrderByIdDesc(): Observable<ClientDto[]> {
    return this.http.get<ClientDto[]>(`${this.apiServerUrl}/clients/searchAllClientsOrderByIdDesc`);
  }

  public getClientDtoById(clientId: number): Observable<ClientDto> {
    return this.http.get<ClientDto>(`${this.apiServerUrl}/clients/findById/${clientId}`);
  }

  public addClientDto(clientDTO: ClientDto): Observable<ClientDto> {
    return this.http.post<ClientDto>(`${this.apiServerUrl}/clients/create`, clientDTO);
  }

  public updateClientDto(clientDTO: ClientDto): Observable<ClientDto> {
    return this.http.put<ClientDto>(`${this.apiServerUrl}/clients/create`, clientDTO);
  }

  public deleteClientDto(clientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/clients/delete/${clientId}`);
  }

}
