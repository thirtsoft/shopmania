import { DialogComponent } from './../../../shared/dialog/dialog.component';
import { DialogConfirmComponent } from './../../../shared/dialog-confirm/dialog-confirm.component';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SScategoryService } from './../../../services/scategory.service';
import { Scategory, ScategoryDto } from './../../../model/scategory';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from './../../../services/dialog.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddScategoryComponent } from './../add-scategory/add-scategory.component';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-list-scategory',
  templateUrl: './list-scategory.component.html',
  styleUrls: ['./list-scategory.component.scss']
})
export class ListScategoryComponent implements OnInit {

  scategoryListDTO: ScategoryDto[];
  addEditscategoryDTO: ScategoryDto;
  deletescategoryDTO: ScategoryDto;

  id : number;
  p : number=1;
  searchText;

  constructor(private scategorieService: SScategoryService,
              private dialog: MatDialog,
              private router: Router,
              public toastr: ToastrService,
              private dialogService: DialogService,
  ){}

  ngOnInit(): void {
    this.getScategoryDTOs();
  }

  public getScategoryDTOs(): void {
    this.scategorieService.getScategoryDtos().subscribe(
      (response: ScategoryDto[]) => {
        this.scategoryListDTO = response;
        console.log(this.scategoryListDTO);
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
        this.onDeleteScategory(id);
      }
    })
  }

  public onDeleteScategory(id: number): void{
    console.log('delete');
    console.log('id--', id);
    this.scategorieService.deleteScategoryDto(id).subscribe(data => {
      let _html=`
              <div class="c-green">
                <div class="material-icons">task_alt</div>
                <h1>onScategory Delete Success!</h1>
              </div>`;
      this.openDialog(_html);
      this.ngOnInit();

    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );
  }

/*
  onAddScategorie() {
    this.openNoteDialog(null);
  }

  openNoteDialog(data?: any){
    const dialogRef = this.dialog.open(AddScategoryComponent, {
      disableClose: true,
      autoFocus : true ,
      width : "50%",
      data: data
    } );

    dialogRef.afterClosed().subscribe(result => {
      if(result && data == null){
        this.scategoryListDTO.push(result);
      }
    });
  }

  addEditScategorie(item: ScategoryDto) {
  }
  */
 // onDeleteScategorie(item) {}

 /*  onDeleteScategorie(scatetgory: ScategoryDto): void{
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe((response: any) =>{
      if(response){
        this.scategorieService.deleteScategoryDto(scatetgory.id).subscribe(data => {
          this.toastr.warning('Scategory supprimé avec succès!');
          this.scategoryListDTO = this.scategoryListDTO.filter(u => u !== scatetgory);
          this.getScategoryDTOs();
        });
      }
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );
  }
 */
 /*  public onDeleteScategorie(scategorieId: number): void {
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    this.scategorieService.deleteScategoryDto(scategorieId).subscribe(
      (response: void) => {
        console.log(response);
        this.getScategoryDTOs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  } */


}
