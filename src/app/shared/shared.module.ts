import { BackendFooterComponent } from './../shared/backend-footer/backend-footer.component';
import { BackendSidebarComponent } from './../shared/backend-sidebar/backend-sidebar.component';
import { BackendHeaderComponent } from './../shared/backend-header/backend-header.component';
import { FooterComponent } from './../shared/footer/footer.component';
import { SidebarComponent } from './../shared/sidebar/sidebar.component';
import { HeaderComponent } from './../shared/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MatdialogComponent } from './matdialog/matdialog.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BackendHeaderComponent,
    BackendSidebarComponent,
    BackendFooterComponent,
    MatdialogComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
