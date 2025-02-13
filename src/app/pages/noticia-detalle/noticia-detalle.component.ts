import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NoticiasService } from '../../core/services/noticias.service';
import { Noticia } from '../../shared/models/noticia.model';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  selector: 'app-noticia-detalle',
  templateUrl: './noticia-detalle.component.html',
  styleUrls: ['./noticia-detalle.component.scss']
})
export class NoticiaDetalleComponent implements OnInit {
  noticia?: Noticia;
  recomendadas: Noticia[] = [];
  errorMessage = '';
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarNoticia(id);
    this.cargarRecomendadas(id);
  }

  cargarNoticia(id: number): void {
    this.noticiasService.getNoticiaDetalle(id).subscribe({
      next: data => {
        this.noticia = data;
        this.isLoading = false;
      },
      error: _ => {
        this.errorMessage = 'Error al cargar la noticia.';
        this.isLoading = false;
      }
    });
  }

  cargarRecomendadas(id: number): void {
    this.noticiasService.getNoticiasRecomendadas(id).subscribe({
      next: data => this.recomendadas = data,
      error: _ => console.log('Error al cargar noticias recomendadas')
    });
  }

  volver(): void {
    history.back();
  }
}
