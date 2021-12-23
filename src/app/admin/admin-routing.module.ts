import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';

import { ListCategoryComponent } from './category/list-category/list-category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';

import { ListSubCategoryComponent } from './subcategorie/list-sub-category/list-sub-category.component';
import { CreateSubCategoryComponent } from './subcategorie/create-sub-category/create-sub-category.component';

import { ListArticleComponent } from './article/list-article/list-article.component';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { UpdateArtileComponent } from './article/update-artile/update-artile.component';
import { UploadFileComponent } from './article/upload-file/upload-file.component';

import { ListFournisseurComponent } from './fournisseur/list-fournisseur/list-fournisseur.component';
import { AddFournisseurComponent } from './fournisseur/add-fournisseur/add-fournisseur.component';
import { EnvoiEmailFournisseurComponent } from './fournisseur/envoi-email-fournisseur/envoi-email-fournisseur.component';

import { ListNoteArticleComponent } from './list-note-article/list-note-article.component';

import { ListCommandeComponent } from './commande/list-commande/list-commande.component';
import { ListCommandeEncoursComponent } from './commande/list-commande-encours/list-commande-encours.component';
import { ListCommandePayeesComponent } from './commande/list-commande-payees/list-commande-payees.component';
import { ViewCommandeComponent } from './commande/view-commande/view-commande.component';
import { ListLigneCommandeComponent } from './commande/list-ligne-commande/list-ligne-commande.component';

import { ListClientComponent } from './list-client/list-client.component';

import { ListAddressClientComponent } from './list-address-client/list-address-client.component';
import { ListAddressLivraisonComponent } from './list-address-livraison/list-address-livraison.component';

import { ListBlogComponent } from './blog/list-blog/list-blog.component';
import { AddBlogComponent } from './blog/add-blog/add-blog.component';
import { UploadFileBlogComponent } from './blog/upload-file-blog/upload-file-blog.component';

import { ResponseNewsletterComponent } from './newsletter/response-newsletter/response-newsletter.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { BarChartComponent } from './chartjs/bar-chart/bar-chart.component';

import { AuthGuardService } from '../auth/auth-guard.service';

import { ListNewsletterComponent } from './newsletter/list-newsletter/list-newsletter.component';
import { SendMailToAllCustomerComponent } from './newsletter/send-mail-to-all-customer/send-mail-to-all-customer.component';

import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { SuccessSignUpComponent } from './authentication/success-sign-up/success-sign-up.component';
import { SeConnecterComponent } from './authentication/se-connecter/se-connecter.component';

import { ListUtilisateurComponent } from './utilisateur/list-utilisateur/list-utilisateur.component';
import { ProfilComponent } from './authentication/profil/profil.component';
import { AddUtilisateurComponent } from './utilisateur/add-utilisateur/add-utilisateur.component';
import { UpdatePasswordComponent } from './authentication/update-password/update-password.component';
import { UpdateProfilComponent } from './authentication/update-profil/update-profil.component';
import { ListHistoriqueLoginComponent } from './utilisateur/list-historique-login/list-historique-login.component';


const routes: Routes = [

/*   { path: 'signIn', component: SeConnecterComponent, children: [

    { path:'signIn', redirectTo:'signIn' , pathMatch:'full'},

  ] }, */
  { path: '',   redirectTo: 'signIn', pathMatch: 'full' },
  {
    path: 'signIn',
    component: SeConnecterComponent
  },
  /*

  { path:'', redirectTo:'signIn' , pathMatch:'full'},

  {
    path: 'signIn', component: SeConnecterComponent
  },

  {
    path: 'signUp', component: SignUpComponent
  },*/
  {
    path: 'success-signUp',
    component: SuccessSignUpComponent
  },

  { path: 'accueil', component: AccueilComponent,
    children : [

    { path: '',   redirectTo: 'dashborad', pathMatch: 'full' }, // redirect to


    {
      path: 'dashborad',
      component: DashboardComponent
    },

    {
      path: 'signUp', component: SignUpComponent
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
      path : 'newsletters',
      component : ListNewsletterComponent
    },
    {
      path : 'responseNewsletter',
      component : ResponseNewsletterComponent
    },
    {
      path : 'sendMailToAllCustomer',
      component : SendMailToAllCustomerComponent
    },
    {
      path: 'chart',
      component: BarChartComponent
    },

    {
      path: 'blogs',
      component: ListBlogComponent
    },
    {
      path: 'blog',
      component: AddBlogComponent
    },
    {
      path:'blog/:id',
      component: AddBlogComponent
    },
    {
      path : 'blog/:id',
      component : UploadFileBlogComponent
    },
    {
      path : 'profile/:id',
      component : ProfilComponent
    },
    {
      path : 'profile/:id',
      component : UpdateProfilComponent
    },
    {
      path : 'profile/:id',
      component : UpdatePasswordComponent
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
      component: AddUtilisateurComponent
    },
    {
      path: 'historique-Connection',
      component: ListHistoriqueLoginComponent
    },
  ]

  },



];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
