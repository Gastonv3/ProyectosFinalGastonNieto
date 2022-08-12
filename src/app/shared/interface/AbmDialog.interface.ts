import { IAlumno } from './alumno.interface';
export interface IAbmDialog {
  operacionCod: number;
  operacionDesc: string;
  alumno: IAlumno;
  post: number;
}
