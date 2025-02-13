import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../core/services/noticias.service';
import { Noticia } from '../../shared/models/noticia.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-home',
  template: `
    <h1>Noticias Recientes</h1>
    <p *ngIf="errorMessage">{{ errorMessage }}</p>

    <div *ngFor="let noticia of noticias">
      <img [src]="noticia.imagen" alt="Imagen Noticia" width="200">
      <h3>{{ noticia.titulo }}</h3>
      <p>{{ noticia.descripcion }}</p>
      <button [routerLink]="['/noticias', noticia.id]">Ver más</button>
      <hr/>
    </div>
  `
})
export class HomeComponent implements OnInit {
  noticias: Noticia[] = [];
  errorMessage = '';

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.noticiasService.getNoticias().subscribe({
      next: data => this.noticias = data,
      error: _ => this.errorMessage = 'Error cargando noticias'
    });
  }
}
