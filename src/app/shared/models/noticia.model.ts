export interface Noticia {
    id: number;
    titulo: string;
    descripcion: string;
    imagen: string;
    fechaPublicacion?: string;  // O "Date" si manejas objetos Date
    categoriaId?: number;       // Relación con la categoría
  }