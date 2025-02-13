import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Noticia } from '../../shared/models/noticia.model';
import { Categoria } from '../../shared/models/categoria.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private BASE_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.BASE_URL}/noticias`);
  }

  getNoticiaDetalle(id: number): Observable<Noticia> {
    return this.http.get<Noticia>(`${this.BASE_URL}/noticias/${id}`);
  }

  getNoticiasRecomendadas(id: number): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.BASE_URL}/noticias/${id}/recomendadas`);
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.BASE_URL}/categorias`);
  }

}
