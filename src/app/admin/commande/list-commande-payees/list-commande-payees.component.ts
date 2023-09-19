import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommandeService } from './../../../services/commande.service';
import { CommandeDto } from './../../../model/commande';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-commande-payees',
  templateUrl: './list-commande-payees.component.html',
  styleUrls: ['./list-commande-payees.component.css']
})
export class ListCommandePayeesComponent implements OnInit {

  commandeDTOList: CommandeDto[];

  id : number;
  p : number=1;
  searchText;

  constructor(private crudApi: CommandeService,
              private router: Router
  ){}


  ngOnInit(): void {
    this.getCommandeDtosByStatusPurchase();
  }

  public getCommandeDtosByStatusPurchase(): void {
    this.crudApi.getCommandeDtosByStatusPurchased().subscribe(
      (response: CommandeDto[]) => {
        this.commandeDTOList = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  viewAllCommandes() {
    this.router.navigate(['/admin/accueil/commandes']);
  }

}
