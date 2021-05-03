import { Routes } from '@angular/router';

export const DEFAULT_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../customer/customer.module').then(m => m.CustomerModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)
    }
]
