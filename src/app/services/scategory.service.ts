import { FormGroup } from '@angular/forms';
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

  public choixmenu : string  = 'A';

  public dataForm:  FormGroup;

  listData : ScategoryDto[];

  formData:  ScategoryDto;

  constructor(private http: HttpClient) {
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

  public updateScategoryDto(scategoryId: number, scategoryDTO: ScategoryDto): Observable<ScategoryDto> {
    return this.http.put<ScategoryDto>(`${this.apiServerUrl}/scategories/update/${scategoryId}`, scategoryDTO);
  }

  public deleteScategoryDto(scategoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/scategories/delete/${scategoryId}`);
  }


}
