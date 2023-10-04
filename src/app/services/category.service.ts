import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { Category, CategoryDto } from './../model/category';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

   apiServerUrl = environment.apiBaseUrl;

  public choixmenu : string  = 'A';

  public dataForm:  FormGroup;

  listData : CategoryDto[];

  constructor(private http: HttpClient) {
  }

  public getAllActiveCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.apiServerUrl}/categories/search-all-active-categories`);
  }

  public getCategoryDtoById(categoryId: number): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${this.apiServerUrl}/categories/findById/${categoryId}`);
  }

  public addCategoryDto(categoryDTO: CategoryDto): Observable<CategoryDto> {
    return this.http.post<CategoryDto>(`${this.apiServerUrl}/categories/create`, categoryDTO);
  }

  public updateCategoryDto(categoryId: number, categoryDTO: CategoryDto): Observable<CategoryDto> {
    return this.http.put<CategoryDto>(`${this.apiServerUrl}/categories/update/${categoryId}`, categoryDTO);
  }

  public deleteCategoryById(subCatId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/categories/delete-category/${subCatId}`);
  }

}
