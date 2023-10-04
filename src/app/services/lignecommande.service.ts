import { LigneCommande, LigneCommandeDto } from './../model/ligne-commande';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LigneLigneCommandeService {

  apiServerUrl = environment.apiBaseUrl;

  listData : LigneCommandeDto[];

  constructor(private http: HttpClient) {
  }

  public getLigneCommandeDtosOrderByIdDesc(): Observable<LigneCommandeDto[]> {
    return this.http.get<LigneCommandeDto[]>(`${this.apiServerUrl}/lignecommandes/findListArticleGroupByIdDesc`);
  }

  public getLigneCommandeDtosByCommandeId(comId: number): Observable<LigneCommandeDto[]> {
    return this.http.get<LigneCommandeDto[]>(`${this.apiServerUrl}/lignecommandes/search-all-lignecommandes-by-commandeId/${comId}`);
  }

  public getLigneCommandeDtoById(ligneCommandeId: number): Observable<LigneCommandeDto> {
    return this.http.get<LigneCommandeDto>(`${this.apiServerUrl}/lignecommandes/findById/${ligneCommandeId}`);
  }

  public getAllActiveLigneCommandes(): Observable<LigneCommandeDto[]> {
    return this.http.get<LigneCommandeDto[]>(`${this.apiServerUrl}/lignecommandes/search-all-active-lignecommandes`);
  }

  public deleteLigneCommandeById(subCatId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/lignecommandes/delete-lignecommande/${subCatId}`);
  }

}
