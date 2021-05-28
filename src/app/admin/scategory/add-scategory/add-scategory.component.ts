import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from './../../../services/category.service';
import { SScategoryService } from './../../../services/scategory.service';
import { CategoryDto } from './../../../model/category';
import { ScategoryDto } from './../../../model/scategory';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-scategory',
  templateUrl: './add-scategory.component.html',
  styleUrls: ['./add-scategory.component.scss']
})
export class AddScategoryComponent implements OnInit {

  addEditScategoryDTO: ScategoryDto = new ScategoryDto();
  categoryListDTO: CategoryDto[];

  constructor(private scatService: SScategoryService,
              private catService: CategoryService,
              private toastr: ToastrService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<AddScategoryComponent>,
  ){}

  ngOnInit(): void {
    this.getListCategoryDTOs();

  }

  getListCategoryDTOs() {
    this.catService.getCategorieDTOs().subscribe(
      (response: CategoryDto[]) => {
        this.categoryListDTO = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddScategory() {
    this.scatService.addScategoryDto(this.addEditScategoryDTO).subscribe(
      (response: ScategoryDto) => {
        this.dialogRef.close();
        this.toastr.success("Scategory Ajouté avec Succès");
        this.router.navigate(['/backend/admin/scategories']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addEditScategory() {

  }


}
