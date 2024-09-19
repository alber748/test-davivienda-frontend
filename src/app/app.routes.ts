import { Routes } from '@angular/router';
import { GestionSoapComponent } from './pages/gestion-soap/gestion-soap.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'gestion-soap',
        component: GestionSoapComponent,
      },
      {
        path: 'gestion-solicitudes',
        loadChildren : () => import('./pages/gestion-solicitudes/solicitudes.routes')
      },
      { path: '**', redirectTo: '' },
];