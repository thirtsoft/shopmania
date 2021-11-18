import { EnvoiEmailFournisseurComponent } from './fournisseur/envoi-email-fournisseur/envoi-email-fournisseur.component';
import { ListCommandePayeesComponent } from './commande/list-commande-payees/list-commande-payees.component';
import { UploadFileComponent } from './article/upload-file/upload-file.component';
import { ListCommandeEncoursComponent } from './commande/list-commande-encours/list-commande-encours.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopLeftComponent } from './top-left/top-left.component';
import { UpdateUtilisateurComponent } from './utilisateur/update-utilisateur/update-utilisateur.component';
import { UpdateFournisseurComponent } from './fournisseur/update-fournisseur/update-fournisseur.component';
import { UpdateArtileComponent } from './article/update-artile/update-artile.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';

import { BarChartComponent } from './chartjs/bar-chart/bar-chart.component';
import { SuccessSignUpComponent } from './authentication/success-sign-up/success-sign-up.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { ListNoteArticleComponent } from './list-note-article/list-note-article.component';
import { ListArticleComponent } from './article/list-article/list-article.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { AddFournisseurComponent } from './fournisseur/add-fournisseur/add-fournisseur.component';
import { ListFournisseurComponent } from './fournisseur/list-fournisseur/list-fournisseur.component';
import { ListUtilisateurComponent } from './utilisateur/list-utilisateur/list-utilisateur.component';
import { AddUtilisateurComponent } from './utilisateur/add-utilisateur/add-utilisateur.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListLigneCommandeComponent } from './commande/list-ligne-commande/list-ligne-commande.component';
import { ListCommandeComponent } from './commande/list-commande/list-commande.component';
import { ViewCommandeComponent } from './commande/view-commande/view-commande.component';
import { ListAddressClientComponent } from './list-address-client/list-address-client.component';
import { ListAddressLivraisonComponent } from './list-address-livraison/list-address-livraison.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';

import { CreateSubCategoryComponent } from './subcategorie/create-sub-category/create-sub-category.component';
import { ListSubCategoryComponent } from './subcategorie/list-sub-category/list-sub-category.component';
import { SeConnecterComponent } from './authentication/se-connecter/se-connecter.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';


const routes: Routes = [

  { path: '', component: SeConnecterComponent, children: [
    { path:'', redirectTo:'signIn' , pathMatch:'full'},

  ] },

  /* {
    path: 'signIn', component: SeConnecterComponent
  }, */
  {
    path: 'signUp', component: SignUpComponent
  },
  {
    path: 'success-signUp',
    component: SuccessSignUpComponent
  },

  { path: '',   redirectTo: 'dashborad', pathMatch: 'full' }, // redirect to


  {
    path: 'dashborad',
    component: DashboardComponent
  },


  {
    path: 'categories',
    component: ListCategoryComponent
  },
   {
    path:'categorie/:id',
    component:AddCategoryComponent
  },
  {
    path: 'categorie',
    component: AddCategoryComponent
  },
 /*  { path: 'scategories', children: [
    { path: '', component: ListSubCategoryComponent},
    { path:'edit/:id',component: CreateSubCategoryComponent },
  ]
}, */
  {
    path: 'scategories',
    component: ListSubCategoryComponent
  },
  {
    path:'scategorie/:id',
    component:CreateSubCategoryComponent
  },
  {
    path: 'scategorie',
    component: CreateSubCategoryComponent
  },
  {
    path: 'articles',
    component: ListArticleComponent
  },
  {
    path: 'article',
    component: AddArticleComponent
  },
  {
    path:'article/:id',
    component:AddArticleComponent
  },
  {
    path:'wiewArticle/:id',
    component : UpdateArtileComponent
  },
  {
    path : 'articles/:id',
    component : UploadFileComponent
  },
  {
    path: 'fournisseurs',
    component: ListFournisseurComponent
  },
  {
    path: 'fournisseur',
    component: AddFournisseurComponent
  },
  {
    path : 'sendEmailToFournisseur',
    component: EnvoiEmailFournisseurComponent
  },
  {
    path:'fournisseur/:id',
    component:AddFournisseurComponent
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
    path: 'commandes-encours',
    component: ListCommandeEncoursComponent
  },
  {
    path : 'commandes-payees',
    component : ListCommandePayeesComponent
  },
  {
    path:'commandeView/:id',
    component: ViewCommandeComponent
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
    path: 'chart',
    component: BarChartComponent
  },
  {
    path: 'utilisateurs',
    component: ListUtilisateurComponent
  },
  {
    path: 'utilisateur',
    component: AddUtilisateurComponent
  },
  {
    path:'utilisateur/:id',
    component:AddUtilisateurComponent
  },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
