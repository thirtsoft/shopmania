import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { Category, CategoryDto } from './../../../model/category';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


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
              private router: Router,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<AddCategoryComponent>
  ){}

  ngOnInit(): void {

  }

  public onAddCategory() {
    this.categoryService.addCategoryDto(this.addEditCategoryData).subscribe(
      (response: CategoryDto) => {
        this.dialogRef.close();
        this.toastr.success("Category Ajouté avec Succès");
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
