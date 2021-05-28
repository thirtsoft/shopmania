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

  categoryListDTO: CategoryDto[];
  categoryDTO : CategoryDto = new CategoryDto();

  constructor(private categoryService: CategoryService,
              private dialog: MatDialog,
              private router: Router){}

  ngOnInit(): void {
    this.getListCategoryDTOs();
  }

  public getListCategoryDTOs(): void {
    this.categoryService.getCategorieDTOs().subscribe(
      (response: CategoryDto[]) => {
        this.categoryListDTO = response;
        console.log(this.categoryListDTO);
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
        this.categoryListDTO.push(result);
      }
      // this.refreshData();
    });
  }

  addEditCategorie(i) {

  }
  public onDeleteCategory(categoryId: number): void {
    this.categoryService.deleteCategoryDto(categoryId).subscribe(
      (response: void) => {
        console.log(response);
        this.getListCategoryDTOs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
