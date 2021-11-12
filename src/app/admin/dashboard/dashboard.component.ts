import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DashboardService } from './../../services/dashboard.service';

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

  constructor(private dashboardService: DashboardService,
              private router: Router,
              public toastr: ToastrService,
  ){}

  ngOnInit(): void {

    this.getNumberOfClients();

    this.getNumberOfFournisseurs();

    this.getNumberOfFournisseurs();

    this.getNumberOfOrders();

    this.getNumberOfOrderByPendingStatus();

    this.getNumberOfOrdersInMonth();

    this.getSumOfOdersInMonth();

    this.getSumOfOdersInYear();

    this.getNumberOfNotificationInMonth();


  }

  getNumberOfClients(): void {
    this.dashboardService.countNumberOfClient().subscribe(data => {
      this.numberOfClients = data;
      console.log(data);
    });
  }

  getNumberOfFournisseurs(): void {
    this.dashboardService.countNumberOfFournisseurs().subscribe(data => {
      this.numberOfFournisseurs = data;
    });
  }

  getNumberOfOrders(): void {
    this.dashboardService.countNumberOfCommande().subscribe(response => {
      this.numberOfCommandes = response;
    });
  }

  getNumberOfOrderByPendingStatus(): void {
    this.dashboardService.countNumberOfOrdersByStatusPending().subscribe(response => {
      this.numberOfCommandeByPendingStatus = response;
    });
  }

  getNumberOfOrdersInMonth(): void {
    this.dashboardService.countNumberOfOrdersInMonth().subscribe(response => {
      this.numberOfCommandeInMonth = response;
    });
  }

  getSumOfOdersInDay(): void {
    this.dashboardService.sumTotaleOfCommandeInDay()
      .subscribe(response => {
        this.sumOfCommandeInDay = response;
    });
  }

  getSumOfOdersInMonth(): void {
    this.dashboardService.sumTotaleOfCommandeInMonth().subscribe(response => {
      this.sumOfCommandeInMonth = response;
    });
  }

  getSumOfOdersInYear(): void {
    this.dashboardService.sumTotaleOfCommandeInYear()
      .subscribe(response => {
      this.sumOfCommandeInYear = response;
    });
  }

  getNumberOfNotificationInMonth(): void {
    this.dashboardService.countNumberOfNotification()
      .subscribe(response => {
      this.numberOfNotificationInMonth = response;
    });
  }


}
