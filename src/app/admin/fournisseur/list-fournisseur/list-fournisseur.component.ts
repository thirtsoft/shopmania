import { AddFournisseurComponent } from './../add-fournisseur/add-fournisseur.component';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Fournisseur, FournisseurDto } from './../../../model/fournisseur';
import { FournisseurService } from './../../../services/fournisseur.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss']
})
export class ListFournisseurComponent implements OnInit {

  fournisseurs: Fournisseur[];
  fournisseurDTOList: FournisseurDto[];
  deleteFournisseur: Fournisseur;

  id : number;
  p : number=1;
  searchText;

  fournisseurDTO : FournisseurDto = new FournisseurDto();

  constructor(private fournisseurService: FournisseurService,
              private dialog: MatDialog,
              private router: Router){}

  ngOnInit(): void {
    this.getFournisseurs();
    this.getFournisseurDTOs();
  }

  public getFournisseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe(
      (response: Fournisseur[]) => {
        this.fournisseurs = response;
        console.log(this.fournisseurs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getFournisseurDTOs(): void {
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

/*   public onCreateFournisseur() {
    this.router.navigate(['/newFournisseur']);
  }
 */
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
      // this.refreshData();
    });
  }


  addEditFournisseur(i) {

  }
  public onDeleteForunisseur(fourId: number): void {
    this.fournisseurService.deleteFournisseur(fourId).subscribe(
      (response: void) => {
        console.log(response);
        this.getFournisseurs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}
