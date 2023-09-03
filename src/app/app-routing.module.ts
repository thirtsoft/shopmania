import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BACKEND_ROUTES } from './routes/admin-layout-routes';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DEFAULT_ROUTES } from './routes/defaut-layout-routes';
import { DefautLayoutComponent } from './layouts/defaut-layout/defaut-layout.component';
import { PageNotfoundComponent } from './admin/page-notfound/page-notfound.component';


/* const routes: Routes = [
  { path: '', component: DefautLayoutComponent, children: DEFAULT_ROUTES },
  { path: 'backend', component: AdminLayoutComponent, children: BACKEND_ROUTES },
  { path: '**', redirectTo: '404'}

]; */

const routes: Routes = [
  { path: '',
    loadChildren: () => import('./front/front.module').then(m => m.FrontModule)
  },
  { path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: '**', component: PageNotfoundComponent}
];

@NgModule({
<<<<<<< HEAD
  imports: [RouterModule.forRoot(routes, {useHash : true})],
=======
 // imports: [RouterModule.forRoot(routes, {useHash : true})],
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' },{useHash : true},)],
>>>>>>> 4231753cd853621d39b3224c77bfa079433fa590
  exports: [RouterModule]
})
export class AppRoutingModule { }
