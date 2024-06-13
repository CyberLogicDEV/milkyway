import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'game',
        pathMatch: 'full',
    },
    {
        path: 'game',
        loadChildren: (): any => import('./pages/client-view/dashboard/dashboard.module').then(m => m.DashboardModule),
    },
];
