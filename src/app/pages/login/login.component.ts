// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.services';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-login',
  template: `
    <div>
      <h2>Iniciar Sesión</h2>
      <form (ngSubmit)="onSubmit()">
        <label for="email">Email:</label>
        <input [(ngModel)]="email" name="email" type="text" required />
        <br/>
        <label for="password">Contraseña:</label>
        <input [(ngModel)]="password" name="password" type="password" required />
        <br/>
        <button type="submit">Ingresar</button>
      </form>
      <p *ngIf="errorMessage" class="error-msg">{{ errorMessage }}</p>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.tokenStorage.saveToken(response.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = 'Credenciales inválidas';
      }
    });
  }
}
