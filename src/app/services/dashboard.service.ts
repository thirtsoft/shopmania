import { LigneCommandeDto } from './../model/ligne-commande';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommandeDto } from './../model/commande';
import { FournisseurDto } from './../model/fournisseur';
import { NotificationDto } from './../model/notification';
import { ClientDto } from './../model/client';

<<<<<<< HEAD
import { environment } from './../../environments/environment';
=======
import { environment } from 'src/environments/environment';
>>>>>>> 4231753cd853621d39b3224c77bfa079433fa590


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiServerUrl = environment.apiBaseUrl;

  //apiServerUrl = "https://businesse-admin.herokuapp.com/shop-mania/v1";

  //apiBaseUrl: 'http://localhost:8081/shop-mania/v1';

//  apiBaseUrl: 'http://localhost:8080/dpshop-backend-0.0.1-SNAPSHOT/shop-mania/v1';



  constructor(private http: HttpClient
  ) {}

  public getTop200LigneCommandeOrderByIdDesc(): Observable<LigneCommandeDto[]> {
    return this.http.get<LigneCommandeDto[]>(`${this.apiServerUrl}/lignecommandes/searchTopLigneCommandesOrderByIdDesc`);
  }

  public countNumberOfCommande(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/countNumberOfCommande`);
  }

  public countNumberOfOrdersInMonth(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/countNumberOfOrdersInMonth`);
  }

  public countNumberOfOrdersByStatusPending(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/countNumberOfOrdersByPendingStatus`);
  }

  public countNumberOfCommandeByDay(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/numberOfCommandeByDay`);
  }

  public countNumberOfCommandeByMonth(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/numberOfCommandeByMonth`);
  }

  public sumTotaleOfCommandeInDay(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/sumTotalOfCommandeByDay`);
  }

  public sumTotaleOfCommandeInMonth(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/sumTotalOfCommandeByMonth`);
  }

  public sumTotaleOfCommandeInYear(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/sumTotalOfCommandeByYear`);
  }


  public SumTotaleOfCommandeByMonth(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/sumTotaleOfCommandeByMonthByList`);
  }

  public SumTotaleOfOrdersByYear(): Observable<CommandeDto[]> {
    return this.http.get<CommandeDto[]>(`${this.apiServerUrl}/commandes/sumTotaleOfCommandeByYearList`);
  }

  public countNumberOfClient(): Observable<ClientDto[]> {
    return this.http.get<ClientDto[]>(`${this.apiServerUrl}/clients/countNumberOfClient`);
  }

  public countNumberOfFournisseurs(): Observable<FournisseurDto[]> {
    return this.http.get<FournisseurDto[]>(`${this.apiServerUrl}/fournisseurs/countNumberOfFournisseurs`);
  }

  public countNumberOfNotification(): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${this.apiServerUrl}/notifications/countNumberOfNotification`);
  }

  public countNumberOfNotificationByProductId(noteId: string): Observable<NotificationDto> {
    return this.http.get<NotificationDto>(`${this.apiServerUrl}/notifications/countNumberOfNotificationByProductId/${noteId}`);
  }


}
