import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressClientDto } from '../../model/address-client';
import { AddressAddressClientService } from '../../services/addressclient.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../services/dialog.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';


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
              private router: Router,
               private dialog: MatDialog,
              public toastr: ToastrService,
              private dialogService: DialogService
  ){}

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
  onDeleteAddressClient(item) {}

 /*   public onDeleteAddressClient(addClient: AddressClientDto): void{
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cet donnée ?')
    .afterClosed().subscribe((response: any) =>{
      if(response){
        this.addClientService.deleteAddressClientDto(addClient.id).subscribe(data => {
          this.toastr.warning('AddressClient supprimé avec succès!');
          this.addressClientDTOList = this.addressClientDTOList.filter(u => u !== addClient);
          this.getAddressClientDtos();
        });
      }
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );
  } */

}
