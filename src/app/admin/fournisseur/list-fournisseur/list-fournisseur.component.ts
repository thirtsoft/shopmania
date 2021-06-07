import { DialogComponent } from './../../../shared/dialog/dialog.component';
import { DialogConfirmComponent } from './../../../shared/dialog-confirm/dialog-confirm.component';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AddFournisseurComponent } from './../add-fournisseur/add-fournisseur.component';

import { Fournisseur, FournisseurDto } from './../../../model/fournisseur';
import { FournisseurService } from './../../../services/fournisseur.service';

import { ToastrService } from 'ngx-toastr';
import { DialogService } from './../../../services/dialog.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss']
})
export class ListFournisseurComponent implements OnInit {

  fournisseurDTOList: FournisseurDto[];
  deleteFournisseur: Fournisseur;

  id : number;
  p : number=1;
  searchText;

  fournisseurDTO : FournisseurDto = new FournisseurDto();

  constructor(private fournisseurService: FournisseurService,
              private dialog: MatDialog,
              private router: Router,
              public toastr: ToastrService,
              private dialogService: DialogService
  ){}

  ngOnInit(): void {
    this.getListFournisseurDTOs();
  }

  public getListFournisseurDTOs(): void {
    this.fournisseurService.getFournisseurDTOs().subscribe(
      (response: FournisseurDto[]) => {
        this.fournisseurDTOList = response;
        console.log(this.fournisseurDTOList);
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
        this.onDeleteForunisseur(id);
      }
    })
  }

  public onDeleteForunisseur(id: number): void{
    console.log('delete');
    console.log('id--', id);
    this.fournisseurService.deleteFournisseurDto(id).subscribe(data => {
      let _html=`
              <div class="c-green">
                <div class="material-icons">task_alt</div>
                <h1>Forunisseur Delete Success!</h1>
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

  public onDeleteForunisseur(id: number): void{
    console.log('delete');
    console.log('id--', id);
    const res = this.fournisseurService.deleteFournisseurDto(id);
    if(res) {
      let _html=`
              <div class="c-green">
                <div class="material-icons">task_alt</div>
                <h1>Fournisseur Delete Success!</h1>
              </div>`;
      this.openDialog(_html);
      this.ngOnInit();
    } else {
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    }
  }


  onCreateFournisseur() {
    this.openNoteDialog(null);
  }

  openNoteDialog(data?: any){
    const dialogRef = this.dialog.open(AddFournisseurComponent, {
      disableClose: true,
      autoFocus : true ,
      width : "50%",
      data: data
    } );

    dialogRef.afterClosed().subscribe(result => {
      if(result && data == null){
        this.fournisseurDTOList.push(result);
      }
    });
  }


  addEditFournisseur(i) {
  }
*/
 // onDeleteForunisseur(item) {}

 /*  public onDeleteForunisseur(four: FournisseurDto): void{
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe((response: any) =>{
      if(response){
        this.fournisseurService.deleteFournisseurDto(four.id).subscribe(data => {
          this.toastr.warning('Fournisseur supprimé avec succès!');
          this.fournisseurDTOList = this.fournisseurDTOList.filter(u => u !== four);
          this.getListFournisseurDTOs();
        });
      }
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );
  } */


}
