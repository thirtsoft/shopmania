import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListCategoryComponent } from './admin/category/list-category/list-category.component';
import { ListScategoryComponent } from './admin/scategory/list-scategory/list-scategory.component';
import { ListArticleComponent } from './admin/article/list-article/list-article.component';
import { ListFournisseurComponent } from './admin/fournisseur/list-fournisseur/list-fournisseur.component';
import { ListCommandeComponent } from './admin/list-commande/list-commande.component';
import { ListNotificationComponent } from './admin/list-notification/list-notification.component';
import { ListClientComponent } from './admin/list-client/list-client.component';
import { ListLigneCommandeComponent } from './admin/list-ligne-commande/list-ligne-commande.component';
import { ListAddressClientComponent } from './admin/list-address-client/list-address-client.component';
import { ListAddressLivraisonComponent } from './admin/list-address-livraison/list-address-livraison.component';
import { ListUtilisateurComponent } from './admin/utilisateur/list-utilisateur/list-utilisateur.component';
import { AddArticleComponent } from './admin/article/add-article/add-article.component';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { AddScategoryComponent } from './admin/scategory/add-scategory/add-scategory.component';
import { AddFournisseurComponent } from './admin/fournisseur/add-fournisseur/add-fournisseur.component';
import { AddUtilisateurComponent } from './admin/utilisateur/add-utilisateur/add-utilisateur.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ListCategoryComponent,
    ListScategoryComponent,
    ListArticleComponent,
    ListFournisseurComponent,
    ListCommandeComponent,
    ListNotificationComponent,
    ListClientComponent,
    ListLigneCommandeComponent,
    ListAddressClientComponent,
    ListAddressLivraisonComponent,
    ListUtilisateurComponent,
    AddArticleComponent,
    AddCategoryComponent,
    AddScategoryComponent,
    AddFournisseurComponent,
    AddUtilisateurComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
