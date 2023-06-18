import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {MatDialog, MatDialogConfig } from '@angular/material';
import { DialogService } from './../../../services/dialog.service';
import { ToastrService } from 'ngx-toastr';

import { SScategoryService } from './../../../services/scategory.service';
import { ScategoryDto } from './../../../model/scategory';
import { CreateSubCategoryComponent } from './../create-sub-category/create-sub-category.component';

@Component({
  selector: 'app-list-sub-category',
  templateUrl: './list-sub-category.component.html',
  styleUrls: ['./list-sub-category.component.css']
})
export class ListSubCategoryComponent implements OnInit {

  subcategoryListDTO: ScategoryDto[];
  categoryDTO : ScategoryDto = new ScategoryDto();
  addEditscategoryDTO: ScategoryDto;
  deletescategoryDTO: ScategoryDto;

  id : number;
  p : number=1;
  searchText;

  constructor(public crudApi: SScategoryService,
              public toastr: ToastrService,
              private dialogService: DialogService,
              private matDialog: MatDialog,
              private route: Router
  ){}

  ngOnInit(): void {
    this.getSListCategoryDTOs();
  }

  public getSListCategoryDTOs(): void {
    this.crudApi.getAllActiveSubCategories().subscribe(
      (response: ScategoryDto[]) => {
        this.subcategoryListDTO = response;
        console.log(this.subcategoryListDTO);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onAddSubcategory() {
    this.route.navigateByUrl('admin/accueil/scategorie');
  }

  addEditSubcategory(id?: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data = {
      id
    };
    this.matDialog.open(CreateSubCategoryComponent, dialogConfig);

  }

  deleteSubcategorie(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteSubCategoryById(id).subscribe(data => {
          this.toastr.error('avec succès','Sous-Categorie supprimée', {
            timeOut: 1500,
            positionClass: 'toast-top-right',
          });
          this.route.navigateByUrl("admin/accueil/scategories").then(() => {
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
