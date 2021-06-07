import { DialogComponent } from './../../../shared/dialog/dialog.component';
import { DialogConfirmComponent } from './../../../shared/dialog-confirm/dialog-confirm.component';
import { UpdateCategoryComponent } from './../update-category/update-category.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryDto } from './../../../model/category';
import { CategoryService } from './../../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AddCategoryComponent } from './../add-category/add-category.component';

import { ToastrService } from 'ngx-toastr';
import { DialogService } from './../../../services/dialog.service';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  categoryListDTO: CategoryDto[];
  categoryDTO : CategoryDto = new CategoryDto();

  id : number;
  p : number=1;
  searchText;

  constructor(private categoryService: CategoryService,
              private dialog: MatDialog,
              private router: Router,
              public toastr: ToastrService,
              private dialogService: DialogService,
  ){}

  ngOnInit(): void {
    this.getListCategoryDTOs();
  }

  public getListCategoryDTOs(): void {
    this.categoryService.getCategorieDTOs().subscribe(
      (response: CategoryDto[]) => {
        this.categoryListDTO = response;
        console.log(this.categoryListDTO);
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

  confirmDialog(id) {
    let dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.onDeleteCategory(id);
      }
    })
  }

  public onDeleteCategory(id: number): void{
    console.log('delete');
    console.log('id--', id);
    this.categoryService.deleteCategoryDto(id).subscribe(data => {
      let _html=`
              <div class="c-green">
                <div class="material-icons">task_alt</div>
                <h1>Category Delete Success!</h1>
              </div>`;
      this.openDialog(_html);
      this.ngOnInit();

    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );

  }

  onAddCategorie() {
    this.openNoteDialog(null);
  }

  openNoteDialog(data?: any){
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      disableClose: true,
      autoFocus : true ,
      width : "50%",
      data: data
    } );
    dialogRef.afterClosed().subscribe(result => {
      if(result && data == null){
        this.categoryListDTO.push(result);
      }
      // this.refreshData();
    });
  }




 /*  public onDeleteCategory(cat: CategoryDto): void{
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe((response: any) =>{
      if(response){
        this.categoryService.deleteCategoryDto(cat.id).subscribe(data => {
          this.toastr.warning('Category supprimé avec succès!');
          this.categoryListDTO = this.categoryListDTO.filter(u => u !== cat);
          this.getListCategoryDTOs();
        });
      }
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );
  }
 */

}
