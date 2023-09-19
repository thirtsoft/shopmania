import { DialogComponent } from './../../../shared/dialog/dialog.component';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Category, CategoryDto } from './../../../model/category';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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

  paramId :any = 0;
  Errors = {status:false, msg:''};
  mySubscription: any;

  constructor(public crudApi: CategoryService,
              public toastr: ToastrService,
              public fb: FormBuilder,
              public router : Router,
              @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<AddCategoryComponent>,
  ){
   /*  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    }); */
  }

  get f() { return this.crudApi.dataForm.controls; }

  ngOnInit() {
    if (this.crudApi.choixmenu == "A"){
      this.infoForm()
    };
  }

  infoForm() {
    const validatorString = '^[a-zA-Z,.!?\\s-]*$';
    this.crudApi.dataForm = this.fb.group({
    //  id: 0,
      code: ['', [Validators.required]],
      designation: ['', [Validators.required, Validators.pattern(validatorString)]],
    });
  }

  getListCategories() {
    this.crudApi.getCategorieDTOs().subscribe(
      response =>{
        this.listData = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  onSubmit() {
    if (this.crudApi.choixmenu == "A"){
      this.saveCategorie();
      this.dialogRef.close();
    }else{
        this.updateCategorie();
    }
  }

  saveCategorie() {
    this.crudApi.addCategoryDto(this.crudApi.dataForm.value)
      .subscribe(response => {
        this.dialogRef.close();
        this.toastr.success('avec succès','Categorie Ajoutée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl("admin/accueil/categories").then(() => {
          window.location.reload();
        });
      },
        (error: HttpErrorResponse) => {
          this.toastr.error("Cette catgory exist déjà, veuillez changez de code");
        }
      );

  }

  updateCategorie(){
    this.crudApi.updateCategoryDto(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.toastr.warning('avec succès','Categorie Modifier', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.router.navigateByUrl("admin/accueil/categories").then(() => {
        window.location.reload();
      });
    });
  }

}
