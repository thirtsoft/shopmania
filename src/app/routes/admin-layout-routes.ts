import { Routes } from '@angular/router';

export const BACKEND_ROUTES: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)
    },
    {
      path: 'dashboard',
      loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    {
      path: 'admin',
      loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule),

    },


]
