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

  /* ngOnInit(): void {
    this.paramId = this.actRoute.snapshot.paramMap.get('id');
    console.log('Param--', this.paramId);
    if(this.paramId  && this.paramId  > 0){
      this.getCategoryDTOByID(this.paramId);
    }

  } */

 /*  public getCategoryDTOByID(id: number) {
    console.log('getOne');
    this.categoryService.getCategoryDtoById(id).subscribe(
      (response: CategoryDto) => {
        console.log('data--', response);
        this.addEditCategoryData = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  } */

  getListCategories() {
    this.crudApi.getCategorieDTOs().subscribe(
      response =>{
        this.listData = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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
        this.toastr.success("Categorie Ajouté avec Succès");
   //     this.getListCategories();
  //      this.router.navigate(['/admin/categories']);
        this.router.navigateByUrl("admin/categories").then(() => {
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
      this.toastr.success("Categorie Modifier avec Succès");
    /*   this.getListCategories();
      this.router.navigate(['/admin/categories']); */
      this.router.navigateByUrl("admin/categories").then(() => {
        window.location.reload();
      });
    });
  }


  /* submit() {
    console.log('Data send--', this.addEditCategoryData);
    this.crudApi.addCategoryDto(this.addEditCategoryData).subscribe(
      (response: CategoryDto) => {
        console.log('Response--', response);
        let _html=`
          <div class="c-green">
            <div class="material-icons">task_alt</div>
            <h1>Category Created Success!</h1>
          </div>`;
          this.openDialog(_html);
          this.router.navigate([`/admin/categories`]);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );

  }

  update() {
    console.log('Data send--', this.addEditCategoryData);
    this.crudApi.updateCategoryDto(this.addEditCategoryData.id, this.addEditCategoryData).subscribe(
      (response: CategoryDto) => {
        console.log('Response--', response);
        let _html=`
          <div class="c-green">
            <div class="material-icons">task_alt</div>
            <h1>Category Update Success!</h1>
          </div>`;
          this.openDialog(_html);
          this.router.navigate([`/admin/categories`]);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  } */



  /*
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

*/


}
