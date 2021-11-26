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

  constructor(private crupdApi: DashboardService,
              private router: Router
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

  goToListOfClient() {
    this.router.navigateByUrl("admin/clients");
  }


}
