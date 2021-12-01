import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';

import { DialogService } from './../../../services/dialog.service';

import { CategoryDto } from './../../../model/category';
import { CategoryService } from './../../../services/category.service';
import { AddCategoryComponent } from './../add-category/add-category.component';



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

  constructor(public crudApi: CategoryService,
              public toastr: ToastrService,
              private dialogService: DialogService,
              private matDialog: MatDialog,
              private route: Router,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<AddCategoryComponent>,
  ){}

  ngOnInit(): void {
    this.getListCategoryDTOs();
  }

  public getListCategoryDTOs(): void {
    this.crudApi.getCategorieDTOsOrderByIdDesc().subscribe(
      (response: CategoryDto[]) => {
        this.categoryListDTO = response;
        console.log(this.categoryListDTO);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onCreateCategorie(){
    this.crudApi.choixmenu == "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(AddCategoryComponent, dialogConfig);
  }

  selectData(item : CategoryDto) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(AddCategoryComponent, dialogConfig);
  }

  deleteCategory(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteCategoryDto(id).subscribe(data => {
          this.toastr.error('avec succès','Categorie supprimé', {
            timeOut: 1500,
            positionClass: 'toast-top-right',
          });
          this.route.navigateByUrl("admin/accueil/categories").then(() => {
            window.location.reload();
          });
        },
          (error: HttpErrorResponse) => {
          this.toastr.error("Impossible de supprimer cet sous_catégorie, veuillez supprimer tous les articles lié à celle-ci");
          }
        );
      }
    });
  }




}
