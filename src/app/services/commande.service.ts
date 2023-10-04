import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Statuscommande } from './../model/statuscommande';
import { Commande, CommandeDto } from './../model/commande';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  apiServerUrl = environment.apiBaseUrl;

  choixmenu : string  = 'A';

  public formData:  FormGroup;

  constructor(private http: HttpClient) {
  }

  public getCommandeDtosByStatusPending(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/find-listOrder-by-status-pending`);
  }

  public getCommandeDtosByStatusPurchased(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/find-listOrder-by-status-payed`);
  }

  public getAllActiveCommandes(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/search-all-active-commandes`);
  }

  public getCommandeDtoById(comId: number): Observable<CommandeDto> {
    return this.http.get<CommandeDto>(`${this.apiServerUrl}/commandes/findById/${comId}`);
  }

  public getCommandeDtoByUserIdOrderDesc(userId: number): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/search-commande-by-userId-order-by-IdDesc/${userId}`);
  }

  public getCommandeDtoByBillingIdOrderDesc(billingAddressId: number): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/search-commande-by-billing-addressIdDesc/${billingAddressId}`);
  }

  public getCommandeDtoByShippingIdOrderDesc(shippingAddressId: number): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/search-commande-by-shipping-addressIdDesc/${shippingAddressId}`);
  }

  public addCommandeDto(commandeDTO: CommandeDto): Observable<CommandeDto> {
    return this.http.post<CommandeDto>(`${this.apiServerUrl}/commandes/create`, commandeDTO);
  }

  public updateStatusOfCommandeDto(id: number, status: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    let data = {"status":status};
    const urlUpdateStatus = (this.apiServerUrl+"/commandes/update-status-of-commande/"+id+"?status="+data.status);
    return this.http.patch<any>(urlUpdateStatus, {headers: headers});

  }

  public getListCommandeDTOByCustomerPageable(clientId: number, page: number, size: number): Observable<CommandeDto[]> {
    const searchbyPriceUrl = (this.apiServerUrl+"/commandes/searchCommandeByCustomerByPageables?clientId="+clientId+"&page="+page+"&size="+size);
    console.log("Search Commande by Customer Url---", searchbyPriceUrl);
    return this.http.get<CommandeDto[]>(searchbyPriceUrl);
  }

  public deleteCommandeById(subCatId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/commandes/delete-commande/${subCatId}`);
  }

}
