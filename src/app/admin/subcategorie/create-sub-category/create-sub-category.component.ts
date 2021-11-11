import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm, FormBuilder, FormControl, Validators } from '@angular/forms';

import { CategoryService } from './../../../services/category.service';
import { SScategoryService } from './../../../services/scategory.service';
import { ScategoryDto } from './../../../model/scategory';
import { CategoryDto } from './../../../model/category';

import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-create-sub-category',
  templateUrl: './create-sub-category.component.html',
  styleUrls: ['./create-sub-category.component.css']
})
export class CreateSubCategoryComponent implements OnInit {

  categoryListDTO: CategoryDto[];
  formDataSubcategorie: ScategoryDto = new ScategoryDto();
  addScategorieForm: NgForm;

  code: FormControl;
  libelle: FormControl;
  categoryDto: FormControl;
  validatorString = '^[a-zA-Z,.!?\\s-]*$';

  constructor(public crudApi: SScategoryService,
              private catService: CategoryService,
              public fb: FormBuilder,
              public toastr: ToastrService,
              private router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<CreateSubCategoryComponent>,
  ) {}

  ngOnInit() {
    this.initForm();
    this.getListCategoryDTOs();
    if (!isNullOrUndefined(this.data.id)) {
      console.log(this.crudApi.listData[this.data.id]);
      this.formDataSubcategorie = Object.assign({},this.crudApi.listData[this.data.id])
    }


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

  initForm() {
    this.formDataSubcategorie = {
      id:0,
      code:"",
      libelle:"",
      categoryDto: new CategoryDto(),
    };

  }

 /*  infoForm() {
    this.code = new FormControl('', Validators.required);
    this.libelle = new FormControl('', [Validators.required]);
    this.categoryDto = new FormControl('', Validators.required);
  } */

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    console.log(this.formDataSubcategorie)
     if (isNullOrUndefined(this.data.id)) {
      this.crudApi.addScategoryDto(this.formDataSubcategorie).
      subscribe( data => {
        this.dialogRef.close();
        this.toastr.success("Scategorie Ajouté avec Succès");
        this.router.navigate(['/admin/scategories']).then(() => {
          window.location.reload();
        });
      },
        (error: HttpErrorResponse) => {
          this.toastr.error("Cet Scategory exist déjà, veuillez changez le code");
        }
      );

    } else {
      console.log(this.formDataSubcategorie.id, this.formDataSubcategorie);
      this.crudApi.updateScategoryDto(this.formDataSubcategorie.id, this.formDataSubcategorie).
      subscribe( data => {
        this.dialogRef.close();
        this.toastr.success("Scategorie Modifiée avec Succès");
        this.router.navigate(['/admin/scategories']).then(() => {
          window.location.reload();
        });
      });

    }

  }

  saveScategorie() {
    if (isNullOrUndefined(this.data.id)) {
      this.crudApi.addScategoryDto(this.addScategorieForm.value).
      subscribe( data => {
        this.dialogRef.close();
        this.toastr.success("Scategorie Ajouté avec Succès");
        this.router.navigate(['/admin/scategories']).then(() => {
          window.location.reload();
        });
      });
    }
  }

  updateScategorie(addScategorieForm: NgForm) {
    if (!isNullOrUndefined(this.data.id)) {
      this.crudApi.updateScategoryDto(addScategorieForm.value.id, addScategorieForm.value).
      subscribe( data => {
        this.dialogRef.close();
        this.toastr.success("Scategorie Ajouté avec Succès");
        this.router.navigate(['/admin/scategories']).then(() => {
          window.location.reload();
        });
      });
    }
  }


  saveScategories() {
    console.log(this.crudApi.dataForm.value);
  }

  updateScategories(){
    this.crudApi.updateScategoryDto(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.success("Scategorie Modifier avec Succès");
      this.router.navigate(['/home/scategories']).then(() => {
        window.location.reload();
      });
//      this.router.navigate(['/home/scategories']);
    });
  }

}
