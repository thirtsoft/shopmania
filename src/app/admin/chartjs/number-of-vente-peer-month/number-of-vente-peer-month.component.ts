import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { DashboardService } from './../../../services/dashboard.service';

import { CommandeDto } from './../../../model/commande';

@Component({
  selector: 'app-number-of-vente-peer-month',
  templateUrl: './number-of-vente-peer-month.component.html',
  styleUrls: ['./number-of-vente-peer-month.component.css']
})
export class NumberOfVentePeerMonthComponent implements OnInit {

  Barchart: any = [];

  NombreCommandeParMois: number[] = [];
  CommandeOfMonth: Date[] = [];

  listAnnes: any={};


  constructor(private crupdApi: DashboardService) { }

  ngOnInit() {
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
      this.Barchart = new Chart('barChartNumberCommandePeerMonth', {
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

}
