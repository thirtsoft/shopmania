import { Client, ClientDto } from './../model/client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getClientDtoById(clientId: number): Observable<ClientDto> {
    return this.http.get<ClientDto>(`${this.apiServerUrl}/clients/findById/${clientId}`);
  }

  public getAllActiveClients(): Observable<ClientDto[]> {
    return this.http.get<ClientDto[]>(`${this.apiServerUrl}/clients/search-all-active-clients`);
  }

  public deleteClientById(clientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/clients/delete-client/${clientId}`);
  }

}
