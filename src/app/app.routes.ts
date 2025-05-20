import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { NewUserComponent } from './dashboard/new-user/new-user.component';

export const routes: Routes = [
    {
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full'
    },
    {
        path: 'login', 
        component: LoginComponent
    },
    {
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'usuarios/nuevo',
        component: NewUserComponent,
        canActivate: [authGuard]
    },
    {
        path: 'usuarios/editar/:id',
        component: NewUserComponent,
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: 'login' },
];
