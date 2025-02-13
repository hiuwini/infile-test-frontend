import { Component, OnInit, HostListener } from '@angular/core';
import { NoticiasService } from '../../core/services/noticias.service';
import { Noticia } from '../../shared/models/noticia.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  noticias: Noticia[] = [];
  errorMessage = '';
  isLoading = true;
  gridCols = 2; // Inicialmente para móviles

  constructor(private noticiasService: NoticiasService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.adjustGrid(window.innerWidth);
    this.noticiasService.getNoticias().subscribe({
      next: data => {
        this.noticias = data;
        this.isLoading = false;
      },
      error: _ => {
        this.errorMessage = 'Error cargando noticias';
        this.isLoading = false;
        this.snackBar.open('No se pudieron cargar las noticias', 'Cerrar', { duration: 3000, panelClass: 'error-snackbar' });
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.adjustGrid(event.target.innerWidth);
  }

  adjustGrid(width: number): void {
    if (width > 1200) {
      this.gridCols = 4; // 🖥️ 4 columnas en pantallas grandes
    } else if (width > 900) {
      this.gridCols = 3; // 💻 3 columnas en laptops
    } else {
      this.gridCols = 2; // 📱 2 columnas en tablets/móviles
    }
  }
}
