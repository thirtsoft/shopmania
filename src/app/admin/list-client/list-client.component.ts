import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ClientService } from './../../services/client.service';
import { Client } from './../../model/client';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {

  public clients: Client[];
  public deleteClient: Client;

  constructor(private clientService: ClientService,
              private router: Router){}

  ngOnInit(): void {
    this.getClients();
  }

  public getClients(): void {
    this.clientService.getClients().subscribe(
      (response: Client[]) => {
        this.clients = response;
        console.log(this.clients);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onSendEmail() {
    this.router.navigate(['/newFournisseur']);
  }

  addEditClient(i) {

  }
  public onDeleteClient(clientId: number): void {
    this.clientService.deleteClient(clientId).subscribe(
      (response: void) => {
        console.log(response);
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}
