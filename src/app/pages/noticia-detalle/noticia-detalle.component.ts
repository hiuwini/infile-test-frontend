// src/app/pages/noticia-detalle/noticia-detalle.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NoticiasService } from '../../core/services/noticias.service';
import { Noticia } from '../../shared/models/noticia.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-noticia-detalle',
  template: `
    <button (click)="volver()">Volver</button>

    <div *ngIf="noticia">
      <h1>{{ noticia.titulo }}</h1>
      <img [src]="noticia.imagen" alt="Imagen Noticia" width="400">
      <p>{{ noticia.descripcion }}</p>
      <p>Fecha: {{ noticia.fechaPublicacion }}</p>
    </div>

    <div *ngIf="recomendadas && recomendadas.length">
      <h3>Noticias Recomendadas</h3>
      <ul>
        <li *ngFor="let rec of recomendadas">
          <a [routerLink]="['/noticias', rec.id]">{{ rec.titulo }}</a>
        </li>
      </ul>
    </div>
  `
})
export class NoticiaDetalleComponent implements OnInit {
  noticia?: Noticia;
  recomendadas: Noticia[] = [];
  errorMessage = '';

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
      next: data => this.noticia = data,
      error: _ => this.errorMessage = 'Error al cargar la noticia.'
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
