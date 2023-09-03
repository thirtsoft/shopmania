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
<<<<<<< HEAD
  
  apiServerUrl = environment.apiBaseUrl;
  
 // apiServerUrl = "http://62.171.128.8:8081/shop-mania/v1";
=======

   apiServerUrl = environment.apiBaseUrl;
>>>>>>> 4231753cd853621d39b3224c77bfa079433fa590


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
    return this.http.get<CategoryDto[]>(`${this.apiServerUrl}/categories/searchAllCategorieOrderByIdDesc`);
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

  public getAllActiveCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.apiServerUrl}/categories/search-all-active-categories`);
  }

  public deleteCategoryById(subCatId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/categories/delete-categories/${subCatId}`);
  }

}
