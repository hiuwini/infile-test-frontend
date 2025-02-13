export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    password?: string; // Campo opcional si manejas registro
    rol?: string;      // Por ejemplo: "USER", "ADMIN"
  }