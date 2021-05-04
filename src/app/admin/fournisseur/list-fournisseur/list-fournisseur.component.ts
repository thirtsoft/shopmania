import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Fournisseur } from './../../../model/fournisseur';
import { FournisseurService } from './../../../services/fournisseur.service';

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss']
})
export class ListFournisseurComponent implements OnInit {

  public fournisseurs: Fournisseur[];
  public deleteFournisseur: Fournisseur;

  constructor(private fournisseurService: FournisseurService,
              private router: Router){}

  ngOnInit(): void {
    this.getFournisseurs();
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

  public onCreateFournisseur() {
    this.router.navigate(['/newFournisseur']);
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
