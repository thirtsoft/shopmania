import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientDto } from '../../model/client';
import { ClientService } from '../../services/client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {

  clientDTOList: ClientDto[];
  deleteClientDTO: ClientDto;

  id : number;
  p : number=1;
  searchText;

  constructor(private clientService: ClientService,
              private router: Router){}

  ngOnInit(): void {
    this.getListClientDtos();
  }

  public getListClientDtos(): void {
    this.clientService.getClientDTOs().subscribe(
      (response: ClientDto[]) => {
        this.clientDTOList = response;
        console.log(this.clientDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteClient(clientId: number): void {
    this.clientService.deleteClientDto(clientId).subscribe(
      (response: void) => {
        console.log(response);
        this.getListClientDtos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}
