import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

import { HttpErrorResponse } from '@angular/common/http';
import { DashboardService } from './../../services/dashboard.service';

import { CommandeDto } from './../../model/commande';
import { LigneCommandeDto } from './../../model/ligne-commande';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  numberOfCommandes: any;
  numberOfCommandeInMonth: any;
  numberOfCommandeByPendingStatus: any;
  sumOfCommandeInDay: any;
  sumOfCommandeInMonth: any;
  sumOfCommandeInYear: any;
  numberOfNotificationInMonth: any;
  numberOfClients: any;
  numberOfFournisseurs: any;

  Barchart: any = [];

  NombreCommandeParMois: number[] = [];
  CommandeOfMonth: Date[] = [];

  listAnnes: any={};

  ligneCommandeDTOList: LigneCommandeDto[];

  id : number;
  p : number=1;
  searchText;

  constructor(private crupdApi: DashboardService,
              private router: Router,
              public toastr: ToastrService,
  ){}

  ngOnInit(): void {

    this.getNumberOfClients();

    this.getNumberOfFournisseurs();

    this.getSumOfOdersInDay();

    this.getNumberOfOrders();

    this.getNumberOfOrderByPendingStatus();

    this.getNumberOfOrdersInMonth();

    this.getSumOfOdersInMonth();

    this.getSumOfOdersInYear();

    this.getNumberOfNotificationInMonth();

    this.getTop200LigneCommandeOrdrByIdDesc();

    this.crupdApi.countNumberOfCommandeByMonth().subscribe((result: CommandeDto[]) => {
      this.listAnnes = result;
      const n = 1;
      const m = 0;
      console.log(this.listAnnes);
      for (let i=0; i<this.listAnnes.length; i++) {
        this.NombreCommandeParMois.push(this.listAnnes[i][n]);
        this.CommandeOfMonth.push(this.listAnnes[i][m]);
      }
    //  this
      this.Barchart = new Chart('barChartCommandeParMonth', {
        type: 'bar',
        data: {
          labels: this.CommandeOfMonth,

          datasets: [
            {
              data: this.NombreCommandeParMois,
              borderColor: '#3cb371',
              backgroundColor: "#5F9EA0",

            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              }
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              }
            }],
          }
        }
      });
    });

  }

  getNumberOfClients(): void {
    this.crupdApi.countNumberOfClient().subscribe(data => {
      this.numberOfClients = data;
      console.log(data);
    });
  }

  getNumberOfFournisseurs(): void {
    this.crupdApi.countNumberOfFournisseurs().subscribe(data => {
      this.numberOfFournisseurs = data;
    });
  }

  getNumberOfOrders(): void {
    this.crupdApi.countNumberOfCommande().subscribe(response => {
      this.numberOfCommandes = response;
    });
  }

  getNumberOfOrderByPendingStatus(): void {
    this.crupdApi.countNumberOfOrdersByStatusPending().subscribe(response => {
      this.numberOfCommandeByPendingStatus = response;
    });
  }

  getNumberOfOrdersInMonth(): void {
    this.crupdApi.countNumberOfOrdersInMonth().subscribe(response => {
      this.numberOfCommandeInMonth = response;
    });
  }

  getSumOfOdersInDay(): void {
    this.crupdApi.sumTotaleOfCommandeInDay()
      .subscribe(response => {
        console.log("Day order :" +response);
        this.sumOfCommandeInDay = response;
    });
  }

  getSumOfOdersInMonth(): void {
    this.crupdApi.sumTotaleOfCommandeInMonth().subscribe(response => {
      this.sumOfCommandeInMonth = response;
    });
  }

  getSumOfOdersInYear(): void {
    this.crupdApi.sumTotaleOfCommandeInYear()
      .subscribe(response => {
      this.sumOfCommandeInYear = response;
    });
  }

  getNumberOfNotificationInMonth(): void {
    this.crupdApi.countNumberOfNotification()
      .subscribe(response => {
      this.numberOfNotificationInMonth = response;
    });
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
