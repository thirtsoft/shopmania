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

  id : number;
  p : number=1;
  searchText;

  constructor(public crudApi: SScategoryService,
              public toastr: ToastrService,
              private dialogService: DialogService,
              private matDialog: MatDialog,
              private route: Router,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<CreateSubCategoryComponent>,
  ){}

  ngOnInit(): void {
    this.getSListCategoryDTOs();
  }

  public getSListCategoryDTOs(): void {
    this.crudApi.getScategoryDtos().subscribe(
      (response: ScategoryDto[]) => {
        this.subcategoryListDTO = response;
        console.log(this.subcategoryListDTO);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
        this.crudApi.deleteScategoryDto(id).subscribe(data => {
          this.toastr.warning('Sous-Categorie supprimé avec succès!');
          this.route.navigateByUrl("admin/scategories").then(() => {
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
