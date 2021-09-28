import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from './../../services/dashboard.service';

@Component({
  selector: 'app-backend-header',
  templateUrl: './backend-header.component.html',
  styleUrls: ['./backend-header.component.scss']
})
export class BackendHeaderComponent implements OnInit {

  numberOfNotificationInMonth: any;
  numberOfCustomerEmail: any;

  constructor(private dashboardService: DashboardService,
              private router: Router,
              public toastr: ToastrService,
  ){}

  ngOnInit(): void {

    this.getNumberOfNotificationInMonth();

  }

  getNumberOfNotificationInMonth(): void {
    this.dashboardService.countNumberOfNotification()
      .subscribe(response => {
      this.numberOfNotificationInMonth = response;
    });
  }



}
