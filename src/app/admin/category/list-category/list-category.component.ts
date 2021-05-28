import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Category, CategoryDto } from './../../../model/category';
import { CategoryService } from './../../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from './../add-category/add-category.component';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  categories: Category[];
  deleteCategory: Category;
  categorie : Category = new Category();
  id : number;
  p : number=1;
  searchText;

  categoryList: CategoryDto[];
  categoryDTO : CategoryDto = new CategoryDto();

  constructor(private categoryService: CategoryService,
              private dialog:MatDialog,
              private router: Router){}

  ngOnInit(): void {
    this.getCategories();
    this.getCategoryDTOs();
  }

  public getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
     //   console.log(this.categories[0].idCategory);
        console.log(this.categories);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getCategoryDTOs(): void {
    this.categoryService.getCategorieDTOs().subscribe(
      (response: CategoryDto[]) => {
        this.categoryList = response;
        console.log(this.categoryList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onCreateCategory() {
    this.router.navigate(['/newCategorie']);
  }

  onAddCategorie() {
    this.openNoteDialog(null);
  }

  openNoteDialog(data?: any){
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      disableClose: true,
      autoFocus : true ,
      width : "50%",
      data: data
    } );

    dialogRef.afterClosed().subscribe(result => {
      if(result && data == null){
        this.categories.push(result);
      }
      // this.refreshData();
    });
  }

  addEditCategorie(i) {

  }
  public onDeleteCategory(categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCategories();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
