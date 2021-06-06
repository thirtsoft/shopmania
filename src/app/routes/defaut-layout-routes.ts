import { Routes } from '@angular/router';

export const DEFAULT_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../front/front.module').then(m => m.FrontModule)
    }
   /*  {
        path: 'auth',
        loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)
    }*/
]
