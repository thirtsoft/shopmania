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


  //apiServerUrl = "https://businesse-admin.herokuapp.com/shop-mania/v1";

  public choixmenu : string  = 'A';

  public dataForm:  FormGroup;

  listData : CategoryDto[];

  constructor(private http: HttpClient) {
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServerUrl}/categories/all`);
  }

  public getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiServerUrl}/categories/findById/${categoryId}`);
  }

  public getCategoryByDesignation(designation: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiServerUrl}/categories/${designation}`);
  }

  public addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiServerUrl}/categories/create`, category);
  }

  public updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiServerUrl}/categories/create`, category);
  }

  public deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/categories/delete/${categoryId}`);
  }


  /***************************** CategoryDTO    *************/

  public getCategorieDTOs(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.apiServerUrl}/categories/all`);
  }

  public getCategorieDTOsOrderByIdDesc(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.apiServerUrl}/categories/searchAllCategoriesOrderByIdDesc`);
  }

  public getCategoryDtoById(categoryId: number): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${this.apiServerUrl}/categories/findById/${categoryId}`);
  }

  public getCategoryDtoByDesignation(designation: string): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${this.apiServerUrl}/categories/${designation}`);
  }

  public addCategoryDto(categoryDTO: CategoryDto): Observable<CategoryDto> {
    return this.http.post<CategoryDto>(`${this.apiServerUrl}/categories/create`, categoryDTO);
  }

  public updateCategoryDto(categoryId: number, categoryDTO: CategoryDto): Observable<CategoryDto> {
    return this.http.put<CategoryDto>(`${this.apiServerUrl}/categories/update/${categoryId}`, categoryDTO);
  }

  public deleteCategoryDto(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/categories/delete/${categoryId}`);
  }

}
