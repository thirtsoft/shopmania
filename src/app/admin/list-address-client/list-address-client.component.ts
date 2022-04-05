import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AddressService } from './../../services/address.service';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../services/dialog.service';

import { AddressDto } from '../../model/address';


@Component({
  selector: 'app-list-address-client',
  templateUrl: './list-address-client.component.html',
  styleUrls: ['./list-address-client.component.scss']
})
export class ListAddressClientComponent implements OnInit {

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

  onDeleteAddressClient(livraison: AddressDto): void{
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
