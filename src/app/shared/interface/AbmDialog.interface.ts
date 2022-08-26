import { IAlumno } from './alumno.interface';
import { ICurso } from './cursos.interface';
import { IClases } from './clases.interface';
export interface IAbmDialog {
  operacionCod: number;
  operacionDesc: string;
  alumno?: IAlumno;
  cursos?: ICurso;
  clase?: IClases;
  post: number;
}
