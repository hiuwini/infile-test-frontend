import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../core/services/noticias.service';
import { Categoria } from '../../shared/models/categoria.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],   // Para *ngFor, *ngIf, etc.
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  errorMessage = '';

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.noticiasService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al cargar categorías';
      }
    });
  }
}
