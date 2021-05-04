import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { Category } from './../../../model/category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  public editCategory: Category = new Category();
  public deleteCategory: Category;

  constructor(private categoryService: CategoryService,
              private router: Router){}

  ngOnInit(): void {

  }

  public onAddCategory() {
    this.categoryService.addCategory(this.editCategory).subscribe(
      (response: Category) => {
       console.log("Add Categry successfully");
        this.router.navigate(['/categories']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addEditCategorie() {

  }


}
