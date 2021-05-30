import { FormBuilder, NgForm } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { Category, CategoryDto } from './../../../model/category';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';



@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  addEditCategoryData: CategoryDto = new CategoryDto();
  deleteCategory: Category;
  listData: CategoryDto[];
  addCategoryForm: NgForm;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private toastr: ToastrService,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<AddCategoryComponent>
  ){}

  ngOnInit(): void {
    if (!isNullOrUndefined(this.data.catId)) {
      console.log(this.listData[this.data.catId]);
      this.addEditCategoryData = Object.assign({},this.listData[this.data.catId])
    }

  }
  onSubmit() {
    if (isNullOrUndefined(this.data.catId)) {
      this.categoryService.addCategoryDto(this.addEditCategoryData).subscribe(
        (response: CategoryDto) => {
          this.dialogRef.close();
          console.log("Category Ajouté");
          this.toastr.success("Category Ajouté avec Succès");
          this.router.navigate(['/backend/admin/categories']);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );

    }else {
      console.log(this.addEditCategoryData.id, this.addEditCategoryData);
      this.categoryService.updateCategoryDto(this.addEditCategoryData.id, this.addEditCategoryData).subscribe(
        (data: CategoryDto) => {
          this.dialogRef.close();
          this.dialogRef.close();
          console.log("Modifiée Ajouté");
          this.toastr.success("Category Modifiée avec Succès");
          this.router.navigate(['/backend/admin/categories']);
        },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
    }

  }

  onAddCategory() {
    this.categoryService.addCategoryDto(this.addEditCategoryData).subscribe(
      (response: CategoryDto) => {
        this.dialogRef.close();
        console.log("Category Ajouté");
        this.toastr.success("Category Ajouté avec Succès");
        this.router.navigate(['/backend/admin/categories']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }




}
