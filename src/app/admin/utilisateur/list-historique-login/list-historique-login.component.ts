import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from './../../../services/dialog.service';


import { HistoriqueLoginService } from './../../../services/historique-login.service';
import { HistoriqueLoginDto } from './../../../model/historique-login';

@Component({
  selector: 'app-list-historique-login',
  templateUrl: './list-historique-login.component.html',
  styleUrls: ['./list-historique-login.component.css']
})
export class ListHistoriqueLoginComponent implements OnInit {

  historiqueLoginListDTO: HistoriqueLoginDto[];

  id : number;
  p : number=1;
  searchText;

  constructor(public crudApi: HistoriqueLoginService,
              public toastr: ToastrService,
              private dialogService: DialogService,
              private route: Router
  ){}

  ngOnInit(): void {
    this.getHistoriqueLoginsDTOs();
  }

  public getHistoriqueLoginsDTOs(): void {
    this.crudApi.getALLHistoriqueLoginDtosOrderByIdDesc().subscribe(
      (response: HistoriqueLoginDto[]) => {
        this.historiqueLoginListDTO = response;
        console.log(this.historiqueLoginListDTO);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  deleteHistoriqueLogin(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteHistoriqueLoginDto(id).subscribe(data => {
          this.toastr.error('avec succès','Sous-Categorie supprimée', {
            timeOut: 1500,
            positionClass: 'toast-top-right',
          });
          this.route.navigateByUrl("admin/scategories").then(() => {
            window.location.reload();
          });
        },
          (error: HttpErrorResponse) => {
          this.toastr.error("Impossible de supprimer, veuillez supprimer reprendre la suppression");
          }
        );
      }
    });
  }

}
