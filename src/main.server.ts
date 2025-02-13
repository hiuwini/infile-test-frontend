// src/main.server.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/platform-server';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { AuthInterceptor } from './app/core/interceptors/auth.interceptor';

// Reemplaza o fusiona con config si deseas
// import { config } from './app/app.config.server';

export function bootstrap() {
  return bootstrapApplication(AppComponent, {
    providers: [
      // Si deseas utilidades extra de SSR:
      provideServerRendering(),

      // Rutas
      provideRouter(appRoutes),

      // HttpClient en modo SSR
      provideHttpClient(),

      // Interceptor de autenticación
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }

      // Si tenías otras configuraciones en app.config.server,
      // podrías fusionarlas aquí:
      // ...config.providers
    ]
  });
}

// Export por defecto, para integrarse con tus scripts SSR
export default bootstrap;
