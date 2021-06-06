import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressLivraisonDto } from '../../model/address-livraison';
import { AddresslivraisonService } from '../../services/addresslivraison.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../services/dialog.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-list-address-livraison',
  templateUrl: './list-address-livraison.component.html',
  styleUrls: ['./list-address-livraison.component.scss']
})
export class ListAddressLivraisonComponent implements OnInit {

  addressLivraisonDTOList: AddressLivraisonDto[];
  deleteAddressLivraisonDTO: AddressLivraisonDto;

  id : number;
  p : number=1;
  searchText;

  constructor(private addLivraisonService: AddresslivraisonService,
              private router: Router,
              private dialog: MatDialog,
              public toastr: ToastrService,
              private dialogService: DialogService
  ){}

  ngOnInit(): void {
    this.getAddressLivraisonDtos();
  }

  public getAddressLivraisonDtos(): void {
    this.addLivraisonService.getAddressLivraisonDtos().subscribe(
      (response: AddressLivraisonDto[]) => {
        this.addressLivraisonDTOList = response;
        console.log(this.addressLivraisonDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  onDeleteAddressLivraison(item) {}

/*   public onDeleteAddressLivraison(livraison: AddressLivraisonDto): void{
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe((response: any) =>{
      if(response){
        this.addLivraisonService.deleteAddressLivraisonDto(livraison.id).subscribe(data => {
          this.toastr.warning('AddressLivraison supprimé avec succès!');
          this.addressLivraisonDTOList = this.addressLivraisonDTOList.filter(u => u !== livraison);
          this.getAddressLivraisonDtos();
        });
      }
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );
  } */


}
