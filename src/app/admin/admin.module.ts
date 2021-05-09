import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { ListAddressLivraisonComponent } from './list-address-livraison/list-address-livraison.component';
import { ListAddressClientComponent } from './list-address-client/list-address-client.component';
import { ListArticleComponent } from './article/list-article/list-article.component';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { AddScategoryComponent } from './scategory/add-scategory/add-scategory.component';
import { ListScategoryComponent } from './scategory/list-scategory/list-scategory.component';
import { ListFournisseurComponent } from './fournisseur/list-fournisseur/list-fournisseur.component';
import { AddFournisseurComponent } from './fournisseur/add-fournisseur/add-fournisseur.component';
import { AddUtilisateurComponent } from './utilisateur/add-utilisateur/add-utilisateur.component';
import { ListUtilisateurComponent } from './utilisateur/list-utilisateur/list-utilisateur.component';
import { ListLigneCommandeComponent } from './list-ligne-commande/list-ligne-commande.component';
import { ListNoteArticleComponent } from './list-note-article/list-note-article.component';
import { AccueilComponent } from './accueil/accueil.component';


@NgModule({
  declarations: [ListAddressLivraisonComponent, ListAddressClientComponent, ListArticleComponent, AddArticleComponent, ListCategoryComponent, AddCategoryComponent, AddScategoryComponent, ListScategoryComponent, ListFournisseurComponent, AddFournisseurComponent, AddUtilisateurComponent, ListUtilisateurComponent, ListLigneCommandeComponent, ListNoteArticleComponent, AccueilComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
