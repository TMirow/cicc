import { provideRouter, Routes } from '@angular/router';
import { loginRoutes } from './login/login.routes';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  ...loginRoutes,
  ...dashboardRoutes,
  { path: '', component:DashboardComponent }
];

