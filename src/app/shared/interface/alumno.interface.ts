export interface IAlumno {
  id?: number;
  Nombre: string;
  Apellido: string;
  Curso: number;
  Nota: number;
  Estado?: string;
  CursoNombre?: string;
  curso_unico?: ICursoUnico;
}

export interface ICursoUnico {
  id: number;
  nombre: string;
}
