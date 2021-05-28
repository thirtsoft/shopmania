import { Scategory, ScategoryDto } from './../model/scategory';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SScategoryService {

  private apiServerUrl = environment.apiBaseUrl;

//  private apiServerUrl = "http://localhost:8081/shop-mania/v1/";

  constructor(private http: HttpClient) {
  }

  public getScategories(): Observable<Scategory[]> {
    return this.http.get<Scategory[]>(`${this.apiServerUrl}/scategories/all`);
  }

  public getScategoryById(scategoryId: number): Observable<Scategory> {
    return this.http.get<Scategory>(`${this.apiServerUrl}/scategories/${scategoryId}`);
  }

  public addScategory(scategory: Scategory): Observable<Scategory> {
    return this.http.post<Scategory>(`${this.apiServerUrl}/scategories/create`, scategory);
  }

  public updateScategory(scategory: Scategory): Observable<Scategory> {
    return this.http.put<Scategory>(`${this.apiServerUrl}/scategories/create`, scategory);
  }

  public deleteScategory(scategoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/scategories/delete/${scategoryId}`);
  }

  /********************* ScategoryDTO ******************/

  public getScategoryDtos(): Observable<ScategoryDto[]> {
    return this.http.get<ScategoryDto[]>(`${this.apiServerUrl}/scategories/all`);
  }

  public getScategoryDtoById(scategoryId: number): Observable<ScategoryDto> {
    return this.http.get<ScategoryDto>(`${this.apiServerUrl}/scategories/${scategoryId}`);
  }

  public addScategoryDto(scategoryDTO: ScategoryDto): Observable<ScategoryDto> {
    return this.http.post<ScategoryDto>(`${this.apiServerUrl}/scategories/create`, scategoryDTO);
  }

  public updateScategoryDto(scategoryDTO: ScategoryDto): Observable<ScategoryDto> {
    return this.http.put<ScategoryDto>(`${this.apiServerUrl}/scategories/create`, scategoryDTO);
  }

  public deleteScategoryDto(scategoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/scategories/delete/${scategoryId}`);
  }


}
