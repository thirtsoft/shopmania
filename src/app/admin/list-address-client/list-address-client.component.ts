import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AddressClientDto } from './../../../model/address-client';
import { AddressAddressClientService } from './../../../services/addressclient.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-address-client',
  templateUrl: './list-address-client.component.html',
  styleUrls: ['./list-address-client.component.scss']
})
export class ListAddressClientComponent implements OnInit {

  addressClientDTOList: AddressClientDto[];
  deleteAddressClientDTO: AddressClientDto;

  id : number;
  p : number=1;
  searchText;

  constructor(private addClientService: AddressAddressClientService,
              private router: Router){}

  ngOnInit(): void {
    this.getAddressClientDtos();
  }

  public getAddressClientDtos(): void {
    this.addClientService.getAddressClientDtos().subscribe(
      (response: AddressClientDto[]) => {
        this.addressClientDTOList = response;
        console.log(this.addressClientDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteAddressClient(addClientId: number): void {
    this.addClientService.deleteAddressClientDto(addClientId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAddressClientDtos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}
