import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';

import { DialogService } from '../../services/dialog.service';
import { AddresslivraisonService } from '../../services/addresslivraison.service';
import { AddressService } from './../../services/address.service';
import { AddressDto } from './../../model/address';

@Component({
  selector: 'app-list-address-livraison',
  templateUrl: './list-address-livraison.component.html',
  styleUrls: ['./list-address-livraison.component.scss']
})
export class ListAddressLivraisonComponent implements OnInit {

  addressLivraisonDTOList: AddressDto[];
  deleteAddressLivraisonDTO: AddressDto;

  id : number;
  p : number=1;
  searchText;

  constructor(private addressService: AddressService,
              private router: Router,
              private dialog: MatDialog,
              public toastr: ToastrService,
              private dialogService: DialogService
  ){}

  ngOnInit(): void {
    this.getAddressLivraisonDtos();
  }

  public getAddressLivraisonDtos(): void {
    this.addressService.getAddressDtosOrderByIdDesc().subscribe(
      (response: AddressDto[]) => {
        this.addressLivraisonDTOList = response;
        console.log(this.addressLivraisonDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteAddressLivraison(livraison: AddressDto): void{
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe((response: any) =>{
      if(response){
        this.addressService.deleteAddressDto(livraison.id).subscribe(data => {
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
  }


}
