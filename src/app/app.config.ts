import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { authInterceptor } from './auth.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHotToastConfig({
      reverseOrder: true,
      dismissible: true,
      autoClose: true,
      position:'top-right',
      duration:3000,
      theme:'toast',
      visibleToasts: 5
    })
  ]
};


export const API_URL = "https://api.escuelajs.co/api/v1"