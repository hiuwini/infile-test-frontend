import { Component } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
  // Indica qué otros componentes Standalone o directivas usaremos
  imports: [NavbarComponent, RouterOutlet]
})
export class AppComponent {}
