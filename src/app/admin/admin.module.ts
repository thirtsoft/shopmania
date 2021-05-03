import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ListNotificationComponent } from './list-notification/list-notification.component';
import { ListAddressClientComponent } from './list-address-client/list-address-client.component';
import { ListAddressLivraisonComponent } from './list-address-livraison/list-address-livraison.component';
import { ListLigneCommandeComponent } from './list-ligne-commande/list-ligne-commande.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListCommandeComponent } from './list-commande/list-commande.component';
import { AddUtilisateurComponent } from './utilisateur/add-utilisateur/add-utilisateur.component';
import { AddFournisseurComponent } from './fournisseur/add-fournisseur/add-fournisseur.component';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { AddScategoryComponent } from './scategory/add-scategory/add-scategory.component';
import { ListUtilisateurComponent } from './utilisateur/list-utilisateur/list-utilisateur.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ListFournisseurComponent } from './fournisseur/list-fournisseur/list-fournisseur.component';
import { ListArticleComponent } from './article/list-article/list-article.component';
import { ListScategoryComponent } from './scategory/list-scategory/list-scategory.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';


@NgModule({
  declarations: [
    ListCategoryComponent,
    ListScategoryComponent,
    ListArticleComponent,
    ListFournisseurComponent,
    ListUtilisateurComponent,
    AddCategoryComponent,
    AddScategoryComponent,
    AddArticleComponent,
    AddFournisseurComponent,
    AddUtilisateurComponent,
    ListClientComponent,
    ListAddressClientComponent,
    ListCommandeComponent,
    ListLigneCommandeComponent,
    ListAddressLivraisonComponent,
    ListNotificationComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
