import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.services';

import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  standalone: true,
  // 2) Agregas 'MatToolbarModule' a la lista de imports
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule
  ],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
