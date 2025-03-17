import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path:'consultation',
        loadComponent: ()=> import('./pages/consultation/consultation.component').then(c => c.ConsultationComponent)
    },
    { path: 'sum',
        loadComponent: ()=> import('./pages/sum/sum.component').then(c => c.SumComponent)
    },
    {path: '**', redirectTo: ''}
];
