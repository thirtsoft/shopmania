import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BACKEND_ROUTES } from './routes/admin-layout-routes';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DEFAULT_ROUTES } from './routes/defaut-layout-routes';
import { DefautLayoutComponent } from './layouts/defaut-layout/defaut-layout.component';


const routes: Routes = [
  { path: '', component: DefautLayoutComponent, children: DEFAULT_ROUTES },
  { path: 'backend', component: AdminLayoutComponent, children: BACKEND_ROUTES },
  { path: '**', redirectTo: '404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
