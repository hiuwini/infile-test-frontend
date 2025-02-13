export interface Noticia {
    id: number;
    titulo: string;
    descripcion: string;
    urlImagen: string;
    fechaPublicacion?: string;  // O "Date" si manejas objetos Date
    categoriaId?: number;       // Relación con la categoría
  }