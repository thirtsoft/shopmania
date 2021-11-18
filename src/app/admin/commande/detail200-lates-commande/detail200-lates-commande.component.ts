import { HttpErrorResponse } from '@angular/common/http';
import { DashboardService } from './../../../services/dashboard.service';
import { LigneCommandeDto } from './../../../model/ligne-commande';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail200-lates-commande',
  templateUrl: './detail200-lates-commande.component.html',
  styleUrls: ['./detail200-lates-commande.component.css']
})
export class Detail200LatesCommandeComponent implements OnInit {

  ligneCommandeDTOList: LigneCommandeDto[];

  p : number=1;
  searchText;

  constructor(private crupdApi: DashboardService) { }

  ngOnInit() {
    this.getTop200LigneCommandeOrdrByIdDesc();

  }

  getTop200LigneCommandeOrdrByIdDesc(): void {
    this.crupdApi.getTop200LigneCommandeOrderByIdDesc().subscribe(
      (response: LigneCommandeDto[]) => {
        this.ligneCommandeDTOList = response;
        console.log(this.ligneCommandeDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}
