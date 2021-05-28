import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListNoteArticleComponent } from './list-note-article/list-note-article.component';
import { ListArticleComponent } from './article/list-article/list-article.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ListScategoryComponent } from './scategory/list-scategory/list-scategory.component';
import { AddScategoryComponent } from './scategory/add-scategory/add-scategory.component';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { AddFournisseurComponent } from './fournisseur/add-fournisseur/add-fournisseur.component';
import { ListFournisseurComponent } from './fournisseur/list-fournisseur/list-fournisseur.component';
import { ListUtilisateurComponent } from './utilisateur/list-utilisateur/list-utilisateur.component';
import { AddUtilisateurComponent } from './utilisateur/add-utilisateur/add-utilisateur.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListLigneCommandeComponent } from './list-ligne-commande/list-ligne-commande.component';
import { ListCommandeComponent } from './list-commande/list-commande.component';
import { ListAddressClientComponent } from './list-address-client/list-address-client.component';
import { ListAddressLivraisonComponent } from './list-address-livraison/list-address-livraison.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';


const routes: Routes = [
/*
  {
    path: '',
    component: AccueilComponent
  },
  */
  {
    path: 'categories',
    component: ListCategoryComponent
  },
  {
    path: 'newCategorie',
    component: AddCategoryComponent
  },
  {
    path: 'scategories',
    component: ListScategoryComponent
  },
  {
    path: 'newScategorie',
    component: AddScategoryComponent
  },
  {
    path: 'articles',
    component: ListArticleComponent
  },
  {
    path: 'newArticle',
    component: AddArticleComponent
  },
  {
    path: 'fournisseurs',
    component: ListFournisseurComponent
  },
  {
    path: 'newFournisseur',
    component: AddFournisseurComponent
  },
  {
    path: 'clients',
    component: ListClientComponent
  },
  {
    path: 'commandes',
    component: ListCommandeComponent
  },
  {
    path: 'detailsCommandes',
    component: ListLigneCommandeComponent
  },
  {
    path: 'addresses',
    component: ListAddressClientComponent
  },
  {
    path: 'livraisons',
    component: ListAddressLivraisonComponent
  },
  {
    path: 'notifications',
    component: ListNoteArticleComponent
  },
  {
    path: 'utilisateurs',
    component: ListUtilisateurComponent
  },
  {
    path: 'newUtilisateur',
    component: AddUtilisateurComponent
  },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
