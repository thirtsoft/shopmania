import { DialogComponent } from './../../../shared/dialog/dialog.component';
import { FormBuilder, NgForm } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Category, CategoryDto } from './../../../model/category';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
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

  data;
  paramId :any = 0;
  Errors = {status:false, msg:''};
  mySubscription: any;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private toastr: ToastrService,
              public fb: FormBuilder,
              private actRoute: ActivatedRoute,
              public dialog: MatDialog,
  ){
    //--for reload componant
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
    this.paramId = this.actRoute.snapshot.paramMap.get('id');
    console.log('Param--', this.paramId);
    if(this.paramId  && this.paramId  > 0){
      this.getCategoryDTOByID(this.paramId);
    }

  }

  public getCategoryDTOByID(id: number) {
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

  }

  openDialog(_html) {
    let dialogRef = this.dialog.open(DialogComponent, {
        data: {
          html: _html,
        }
    });
    setTimeout(() => {
      dialogRef.close();
    }, 2000);
  }

  submit() {
    console.log('Data send--', this.addEditCategoryData);
    this.categoryService.addCategoryDto(this.addEditCategoryData).subscribe(
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
    this.categoryService.updateCategoryDto(this.addEditCategoryData.id, this.addEditCategoryData).subscribe(
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
  }



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
