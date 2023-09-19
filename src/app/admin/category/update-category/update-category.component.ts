import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { CategoryDto } from './../../../model/category';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

  currentCategoryDTO: CategoryDto = new CategoryDto();
  catId: number;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<UpdateCategoryComponent>
  ){ }

  ngOnInit(): void {
     this.catId = this.route.snapshot.params['id'];
     this.categoryService.getCategoryDtoById(this.catId)
       .subscribe(data => {
         this.currentCategoryDTO = data;
       },err=> {
         console.log(err);
     });
  }

  onEditCategory() {
    this.categoryService.updateCategoryDto(this.currentCategoryDTO.id, this.currentCategoryDTO).subscribe(
      (response: CategoryDto) => {
        this.dialogRef.close();
        this.toastr.warning('avec succès','Categorie Modifié', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.router.navigate(['/admin/accueil/categories']);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

  }

}
