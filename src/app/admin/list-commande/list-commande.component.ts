import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeDto } from './../../../model/commande';
import { CommandeService } from './../../../services/commande.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.scss']
})
export class ListCommandeComponent implements OnInit {

  commandeDTOList: CommandeDto[];
  deleteCommandeDTO: CommandeDto;

  id : number;
  p : number=1;
  searchText;

  constructor(private comService: CommandeService,
              private router: Router){}

  ngOnInit(): void {
    this.getCommandeDtos();
  }

  public getCommandeDtos(): void {
    this.comService.getCommandeDtos().subscribe(
      (response: CommandeDto[]) => {
        this.commandeDTOList = response;
        console.log(this.commandeDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCommande(comId: number): void {
    this.comService.deleteCommandeDto(comId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCommandeDtos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}
