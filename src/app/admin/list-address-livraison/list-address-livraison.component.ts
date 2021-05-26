import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressLivraisonDto } from './../../../model/address-livraison';
import { AddresslivraisonService } from './../../../services/addresslivraison.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

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
              private router: Router){}

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

  public onDeleteAddressLivraison(addLivraisonId: number): void {
    this.addLivraisonService.deleteAddressLivraisonDto(addLivraisonId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAddressLivraisonDtos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}
