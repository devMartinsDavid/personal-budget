import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SumComponent } from './pages/sum/sum.component';
import { ConsultationComponent } from './pages/consultation/consultation.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path:'consultation', component: ConsultationComponent},
    { path: 'sum', component: SumComponent },
    {path: '**', redirectTo: ''}
];
