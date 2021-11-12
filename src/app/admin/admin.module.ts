import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination' ;

import { MaterialModule } from '../shared/material.module';


import { ListAddressLivraisonComponent } from './list-address-livraison/list-address-livraison.component';
import { ListAddressClientComponent } from './list-address-client/list-address-client.component';
import { ListArticleComponent } from './article/list-article/list-article.component';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ListFournisseurComponent } from './fournisseur/list-fournisseur/list-fournisseur.component';
import { AddFournisseurComponent } from './fournisseur/add-fournisseur/add-fournisseur.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListCommandeComponent } from './commande/list-commande/list-commande.component';
import { ListLigneCommandeComponent } from './commande/list-ligne-commande/list-ligne-commande.component';
import { ListNoteArticleComponent } from './list-note-article/list-note-article.component';

import { AddUtilisateurComponent } from './utilisateur/add-utilisateur/add-utilisateur.component';
import { ListUtilisateurComponent } from './utilisateur/list-utilisateur/list-utilisateur.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { UpdateArtileComponent } from './article/update-artile/update-artile.component';
import { UpdateFournisseurComponent } from './fournisseur/update-fournisseur/update-fournisseur.component';
import { UpdateUtilisateurComponent } from './utilisateur/update-utilisateur/update-utilisateur.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { BackendHeaderComponent } from './backend-header/backend-header.component';
import { BackendSidebarComponent } from './backend-sidebar/backend-sidebar.component';
import { BackendFooterComponent } from './backend-footer/backend-footer.component';
import { TopLeftComponent } from './top-left/top-left.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { SeConnecterComponent } from './authentication/se-connecter/se-connecter.component';
import { SuccessSignUpComponent } from './authentication/success-sign-up/success-sign-up.component';
import { VenteByMonthBarChartComponent } from './chartjs/vente-by-month-bar-chart/vente-by-month-bar-chart.component';
import { VenteByYearBarChartComponent } from './chartjs/vente-by-year-bar-chart/vente-by-year-bar-chart.component';
import { BarChartComponent } from './chartjs/bar-chart/bar-chart.component';
import { UpdateStatusCommandeComponent } from './update-status-commande/update-status-commande.component';
import { ListCommandeEncoursComponent } from './commande/list-commande-encours/list-commande-encours.component';
import { ListSubCategoryComponent } from './subcategorie/list-sub-category/list-sub-category.component';
import { CreateSubCategoryComponent } from './subcategorie/create-sub-category/create-sub-category.component';
import { ViewCommandeComponent } from './commande/view-commande/view-commande.component';



@NgModule({
  declarations: [
    ListAddressLivraisonComponent,
    ListAddressClientComponent,
    ListArticleComponent,
    AddArticleComponent,
    ListCategoryComponent,
    AddCategoryComponent,
    ListFournisseurComponent,
    AddFournisseurComponent,
    ListClientComponent,
    ListCommandeComponent,
    ListLigneCommandeComponent,
    ListNoteArticleComponent,
    AddUtilisateurComponent,
    ListUtilisateurComponent,
    UpdateCategoryComponent,
    UpdateArtileComponent,
    UpdateFournisseurComponent,
    UpdateUtilisateurComponent,
    PageNotfoundComponent,
    BackendHeaderComponent,
    BackendSidebarComponent,
    BackendFooterComponent,
    TopLeftComponent,
    DashboardComponent,
    SignUpComponent,
    SeConnecterComponent,
    SuccessSignUpComponent,
    VenteByMonthBarChartComponent,
    VenteByYearBarChartComponent,
    BarChartComponent,
    UpdateStatusCommandeComponent,
    ListCommandeEncoursComponent,
    ListSubCategoryComponent,
    CreateSubCategoryComponent,
    ViewCommandeComponent,


  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatExpansionModule,

    MatPaginatorModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,

//    ChartsModule
/*
    NgbModalModule,
    ModalModule,
*/
  ],

  providers: [DatePipe,{ provide: MAT_DIALOG_DATA, useValue: {} ,},
    { provide: MatDialogRef, useValue: {} },

  ],


  entryComponents: [
    AddCategoryComponent, CreateSubCategoryComponent,
    ViewCommandeComponent,
    DashboardComponent
  ]

})
export class AdminModule { }
