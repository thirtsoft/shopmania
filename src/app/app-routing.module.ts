import { ListNotificationComponent } from './admin/list-notification/list-notification.component';
import { ListLigneCommandeComponent } from './admin/list-ligne-commande/list-ligne-commande.component';
import { ListAddressLivraisonComponent } from './admin/list-address-livraison/list-address-livraison.component';
import { ListAddressClientComponent } from './admin/list-address-client/list-address-client.component';
import { ListCommandeComponent } from './admin/list-commande/list-commande.component';
import { ListClientComponent } from './admin/list-client/list-client.component';
import { ListCategoryComponent } from './admin/list-category/list-category.component';
import { AddFournisseurComponent } from './admin/add-fournisseur/add-fournisseur.component';
import { ListFournisseurComponent } from './admin/list-fournisseur/list-fournisseur.component';
import { AddScategoryComponent } from './admin/add-scategory/add-scategory.component';
import { ListScategoryComponent } from './admin/list-scategory/list-scategory.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'categories', component: ListCategoryComponent },
  { path: 'newCategorie', component: AddCategoryComponent },
  { path: 'scategories', component: ListScategoryComponent },
  { path: 'newScategorie', component: AddScategoryComponent },
  { path: 'fournisseurs', component: ListFournisseurComponent },
  { path: 'newFournisseur', component: AddFournisseurComponent },
  { path: 'clients', component: ListClientComponent },
  { path: 'commandes', component: ListCommandeComponent },
  { path: 'lignecommandes', component: ListLigneCommandeComponent },
  { path: 'addresses', component: ListAddressClientComponent },
  { path: 'livraisons', component: ListAddressLivraisonComponent },
  { path: 'notifications', component: ListNotificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
