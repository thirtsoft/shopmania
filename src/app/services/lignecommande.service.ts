import { LigneCommande, LigneCommandeDto } from './../model/ligne-commande';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { environment } from './../../environments/environment';
=======
import { environment } from 'src/environments/environment';
>>>>>>> 4231753cd853621d39b3224c77bfa079433fa590

@Injectable({
  providedIn: 'root'
})
export class LigneLigneCommandeService {

  apiServerUrl = environment.apiBaseUrl;


  //apiServerUrl = "https://businesse-admin.herokuapp.com/shop-mania/v1";

  listData : LigneCommandeDto[];

  constructor(private http: HttpClient) {
  }

  public getLigneCommandes(): Observable<LigneCommande[]> {
    return this.http.get<LigneCommande[]>(`${this.apiServerUrl}/lignecommandes/all`);
  }

  public getLigneCommandeById(ligneCommandeId: number): Observable<LigneCommande> {
    return this.http.get<LigneCommande>(`${this.apiServerUrl}/lignecommandes/${ligneCommandeId}`);
  }

  public addLigneCommande(ligneCommande: LigneCommande): Observable<LigneCommande> {
    return this.http.post<LigneCommande>(`${this.apiServerUrl}/lignecommandes/create`, ligneCommande);
  }

  public updateLigneCommande(ligneCommande: LigneCommande): Observable<LigneCommande> {
    return this.http.put<LigneCommande>(`${this.apiServerUrl}/lignecommandes/create`, ligneCommande);
  }

  public deleteLigneCommande(ligneCommandeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/lignecommandes/delete/${ligneCommandeId}`);
  }

  /*********************** LigneCommandeDTO */

  public getLigneCommandeDtos(): Observable<LigneCommandeDto[]> {
    return this.http.get<LigneCommandeDto[]>(`${this.apiServerUrl}/lignecommandes/all`);
  }

  public getAllLigneCommandeDtosOrderByIdDesc(): Observable<LigneCommandeDto[]> {
    return this.http.get<LigneCommandeDto[]>(`${this.apiServerUrl}/lignecommandes/searchAllLigneCommandeOrderByIdDesc`);
  }

  public getLigneCommandeDtosOrderByIdDesc(): Observable<LigneCommandeDto[]> {
    return this.http.get<LigneCommandeDto[]>(`${this.apiServerUrl}/lignecommandes/findListArticleGroupByIdDesc`);
  }

  public getLigneCommandeDtosByCommandeId(comId: number): Observable<LigneCommandeDto[]> {
    return this.http.get<LigneCommandeDto[]>(`${this.apiServerUrl}/lignecommandes/searchAllLigneCommandesByCommandeId/${comId}`);
  }

  public getLigneCommandeDtoById(ligneCommandeId: number): Observable<LigneCommandeDto> {
    return this.http.get<LigneCommandeDto>(`${this.apiServerUrl}/lignecommandes/${ligneCommandeId}`);
  }

  public addLigneCommandeDto(ligneCommandeDTO: LigneCommandeDto): Observable<LigneCommandeDto> {
    return this.http.post<LigneCommandeDto>(`${this.apiServerUrl}/lignecommandes/create`, ligneCommandeDTO);
  }

  public updateLigneCommandeDto(ligneCommandeDTO: LigneCommandeDto): Observable<LigneCommandeDto> {
    return this.http.put<LigneCommandeDto>(`${this.apiServerUrl}/lignecommandes/create`, ligneCommandeDTO);
  }

  public deleteLigneCommandeDto(ligneCommandeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/lignecommandes/delete/${ligneCommandeId}`);
  }

  public getAllActiveLigneCommandes(): Observable<LigneCommandeDto[]> {
    return this.http.get<LigneCommandeDto[]>(`${this.apiServerUrl}/lignecommandes/search-all-active-lignecommandes`);
  }

  public deleteLigneCommandeById(subCatId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/lignecommandes/delete-lignecommande/${subCatId}`);
  }


}
