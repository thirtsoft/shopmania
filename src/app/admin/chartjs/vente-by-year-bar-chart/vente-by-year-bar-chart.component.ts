import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from './../../../services/dashboard.service';
import { CommandeDto } from './../../../model/commande';

@Component({
  selector: 'app-vente-by-year-bar-chart',
  templateUrl: './vente-by-year-bar-chart.component.html',
  styleUrls: ['./vente-by-year-bar-chart.component.css']
})
export class VenteByYearBarChartComponent implements OnInit {

  Barchart: any = [];

  ChiffreAffaireParAnnees: number[] = [];
  Year: Date[] = [];

  listAnnes: any={}

  constructor(private statService: DashboardService) { }

  ngOnInit() {
    this.statService.SumTotaleOfOrdersByYear().subscribe((result: CommandeDto[]) => {
      this.listAnnes = result;
      const n = 1;
      const m = 0;
      for (let i=0; i<this.listAnnes.length; i++) {
        this.ChiffreAffaireParAnnees.push(this.listAnnes[i][n]);
        this.Year.push(this.listAnnes[i][m]);
      }
    //  this
      this.Barchart = new Chart('barChartVenteByYear', {
        type: 'bar',
        data: {
          labels: this.Year,

          datasets: [
            {
              data: this.ChiffreAffaireParAnnees,
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