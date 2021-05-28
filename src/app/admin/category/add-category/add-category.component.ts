import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { Category, CategoryDto } from './../../../model/category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  editCategory: Category = new Category();
  addEditCategoryData: CategoryDto = new CategoryDto();
  deleteCategory: Category;

  constructor(private categoryService: CategoryService,
              private router: Router){}

  ngOnInit(): void {

  }

  public onAddCategory() {
    this.categoryService.addCategoryDto(this.addEditCategoryData).subscribe(
      (response: CategoryDto) => {
       console.log("Add Categry successfully");
        this.router.navigate(['/backend/admin/categories']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addEditCategorie() {

  }


}
