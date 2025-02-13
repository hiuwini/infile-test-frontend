import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { NoticiaDetalleComponent } from './pages/noticia-detalle/noticia-detalle.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  // Ruta pública: login
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  // Rutas protegidas por AuthGuard:
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'noticias/:id', component: NoticiaDetalleComponent, canActivate: [AuthGuard] },
  { path: 'categorias', component: CategoriasComponent, canActivate: [AuthGuard] },

  // Redirecciona cualquier ruta desconocida al home
  { path: '**', redirectTo: '' }
];
