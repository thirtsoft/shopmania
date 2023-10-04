import { LigneCommandeDto } from './../model/ligne-commande';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommandeDto } from './../model/commande';
import { FournisseurDto } from './../model/fournisseur';
import { NotificationDto } from './../model/notification';
import { ClientDto } from './../model/client';

import { environment } from './../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient
  ) {}

  public getTop200LigneCommandeOrderByIdDesc(): Observable<LigneCommandeDto[]> {
    return this.http.get<LigneCommandeDto[]>(`${this.apiServerUrl}/lignecommandes/search-top-lignecommandes-order-by-IdDesc`);
  }

  public countNumberOfCommande(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/count-number-of-commande`);
  }


  public countNumberOfOrdersInMonth(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/count-number-of-orders-in-month`);
  }

  public countNumberOfOrdersByStatusPending(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/count-number-of-orders-by-pending-status`);
  }

  public countNumberOfCommandeByDay(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/number-of-commande-by-day`);
  }

  public countNumberOfCommandeByMonth(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/number-of-commande-by-month`);
  }

  public sumTotaleOfCommandeInDay(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/sum-total-of-commande-by-day`);
  }

  public sumTotaleOfCommandeInMonth(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/sum-total-of-commande-by-month`);
  }

  public sumTotaleOfCommandeInYear(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/sum-total-of-commande-by-year`);
  }


  public SumTotaleOfCommandeByMonth(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/sum-totale-of-commande-by-month-by-list`);
  }

  public SumTotaleOfOrdersByYear(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/sum-totale-of-commande-by-year-list`);
  }

  public countNumberOfClient(): Observable<ClientDto[]> {
    return this.http.get<ClientDto[]>(`${this.apiServerUrl}/clients/count-number-of-client`);
  }

  public countNumberOfFournisseurs(): Observable<FournisseurDto[]> {
    return this.http.get<FournisseurDto[]>(`${this.apiServerUrl}/fournisseurs/count-number-of-fournisseurs`);
  }

  public countNumberOfNotification(): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${this.apiServerUrl}/notifications/count-number-of-notification`);
  }

  public countNumberOfNotificationByProductId(noteId: string): Observable<NotificationDto> {
    return this.http.get<NotificationDto>(`${this.apiServerUrl}/notifications/count-number-of-notification-by-productId/${noteId}`);
  }


}
