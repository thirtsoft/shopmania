import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LigneCommandeDto } from '../../model/ligne-commande';
import { LigneLigneCommandeService } from '../../services/lignecommande.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-ligne-commande',
  templateUrl: './list-ligne-commande.component.html',
  styleUrls: ['./list-ligne-commande.component.scss']
})
export class ListLigneCommandeComponent implements OnInit {

  ligneCommandeDTOList: LigneCommandeDto[];
  deleteligneCommandeDTO: LigneCommandeDto;

  id : number;
  p : number=1;
  searchText;

  constructor(private lcomService: LigneLigneCommandeService,
              private router: Router){}

  ngOnInit(): void {
    this.getLigneCommandeDtos();
  }

  public getLigneCommandeDtos(): void {
    this.lcomService.getLigneCommandeDtos().subscribe(
      (response: LigneCommandeDto[]) => {
        this.ligneCommandeDTOList = response;
        console.log(this.ligneCommandeDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteligneCommande(lcomId: number): void {
    this.lcomService.deleteLigneCommandeDto(lcomId).subscribe(
      (response: void) => {
        console.log(response);
        this.getLigneCommandeDtos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}
