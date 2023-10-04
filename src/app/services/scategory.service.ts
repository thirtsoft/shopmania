import { FormGroup } from '@angular/forms';
import { Scategory, ScategoryDto } from './../model/scategory';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SScategoryService {

  apiServerUrl = environment.apiBaseUrl;

  public choixmenu : string  = 'A';

  public dataForm:  FormGroup;

  listData : ScategoryDto[];

  formData:  ScategoryDto;

  constructor(private http: HttpClient) {
  }

  public getScategoryDtoById(scategoryId: number): Observable<ScategoryDto> {
    return this.http.get<ScategoryDto>(`${this.apiServerUrl}/scategories/findById/${scategoryId}`);
  }

  public addScategoryDto(scategoryDTO: ScategoryDto): Observable<ScategoryDto> {
    return this.http.post<ScategoryDto>(`${this.apiServerUrl}/scategories/create`, scategoryDTO);
  }

  public updateScategoryDto(scategoryId: number, scategoryDTO: ScategoryDto): Observable<ScategoryDto> {
    return this.http.put<ScategoryDto>(`${this.apiServerUrl}/scategories/update/${scategoryId}`, scategoryDTO);
  }

  public getAllActiveSubCategories(): Observable<ScategoryDto[]> {
    return this.http.get<ScategoryDto[]>(`${this.apiServerUrl}/scategories/search-all-active-scategories`);
  }

  public deleteSubCategoryById(subCatId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/scategories/delete-scategorie/${subCatId}`);
  }


}
