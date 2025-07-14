import 'zone.js';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { authInterceptor } from './app/core/auth/http-interceptors/auth.interceptor';
import { errorInterceptor } from './app/core/auth/http-interceptors/error.interceptor';

import { DashboardComponent } from './app/dashboard/dashboard.component';

bootstrapApplication(DashboardComponent, {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, errorInterceptor])),
  ]
}).catch(err => console.error(err));
