import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from './../../../services/dashboard.service';
import { CommandeDto } from './../../../model/commande';

@Component({
  selector: 'app-vente-by-month-bar-chart',
  templateUrl: './vente-by-month-bar-chart.component.html',
  styleUrls: ['./vente-by-month-bar-chart.component.css']
})
export class VenteByMonthBarChartComponent implements OnInit {

  Barchart: any = [];

  Linechart: any = [];

  ChiffreAffaireMois: number[] = [];
  VenteOfMonth: Date[] = [];

  listAnnes: any={}

  constructor(private statService: DashboardService) { }

  ngOnInit() {
   /*  this.statService.SumTotaleOfCommandeByMonth().subscribe((result: CommandeDto[]) => {
      this.listAnnes = result;
      const n = 1;
      const m = 0;
      console.log(this.listAnnes);
      for (let i=0; i<this.listAnnes.length; i++) {
        this.ChiffreAffaireMois.push(this.listAnnes[i][n]);
        this.VenteOfMonth.push(this.listAnnes[i][m]);
      }

      this.Barchart = new Chart('barChartVenteByMonth', {
        type: 'bar',
        data: {
          labels: this.VenteOfMonth,

          datasets: [
            {
              data: this.ChiffreAffaireMois,
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
    }); */

    this.statService.SumTotaleOfCommandeByMonth().subscribe((result: CommandeDto[]) => {
      this.listAnnes = result;
      const n = 1;
      const m = 0;
      console.log(this.listAnnes);
      for (let i=0; i<this.listAnnes.length; i++) {
        this.ChiffreAffaireMois.push(this.listAnnes[i][n]);
        this.VenteOfMonth.push(this.listAnnes[i][m]);
      }
    //  this
      this.Linechart = new Chart('lineChart', {
        type: 'line',
        data: {
          labels: this.VenteOfMonth,

          datasets: [
            {
              data: this.ChiffreAffaireMois,
              borderColor: '#3cb371',
              backgroundColor: "#FF7F50",
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          responsive: true,
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
