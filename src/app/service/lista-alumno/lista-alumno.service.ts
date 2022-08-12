import { Injectable } from '@angular/core';
import { IAlumno } from '../../shared/interface/alumno.interface';
import { IAbmDialog } from '../../shared/interface/AbmDialog.interface';

@Injectable({
  providedIn: 'root',
})
export class ListaAlumnoService {
  private _listaAlumnos: IAlumno[] = [
    { Nombre: 'Hydrogen', Curso: 'Programacion', Nota: 9 },
    { Nombre: 'Hydrogen', Curso: 'Programacion', Nota: 6 },
    { Nombre: 'Hydrogen', Curso: 'Programacion', Nota: 7 },
    { Nombre: 'Hydrogen', Curso: 'Programacion', Nota: 10 },
  ];
  constructor() {}

  // get listaAlumnos(): IAlumno[] {
  //   return this._listaAlumnos;
  // }

  listaAlumnos() {
    return this._listaAlumnos.slice();
  }

  public AbmAlumno(item: IAbmDialog) {
    console.log(item);
    if (item.operacionCod == 1) {
      this._listaAlumnos.push(item.alumno);
    } else if (item.operacionCod == 2) {
      this._listaAlumnos[item.post].Nombre = item.alumno.Nombre;
      this._listaAlumnos[item.post].Curso = item.alumno.Curso;
      this._listaAlumnos[item.post].Nota = item.alumno.Nota;
    } else {
      this._listaAlumnos.splice(item.post, 1);
    }
  }
}
