import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './../../auth/token-storage.service';

@Component({
  selector: 'app-backend-sidebar',
  templateUrl: './backend-sidebar.component.html',
  styleUrls: ['./backend-sidebar.component.scss']
})
export class BackendSidebarComponent implements OnInit {

  constructor(private tokenService: TokenStorageService,
              private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.tokenService.signOut();
    window.location.reload();
    this.router.navigateByUrl("admin/signIn");
  }

}
