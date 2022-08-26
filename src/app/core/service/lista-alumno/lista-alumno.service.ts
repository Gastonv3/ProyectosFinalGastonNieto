import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAbmDialog } from 'src/app/shared/interface/AbmDialog.interface';
import { IAlumno } from 'src/app/shared/interface/alumno.interface';
import { ICurso } from 'src/app/shared/interface/cursos.interface';
import { ListaCursosService } from '../lista-cursos/lista-cursos.service';

@Injectable({
  providedIn: 'root',
})
export class ListaAlumnoService {
  private _listaAlumnos: IAlumno[] = [
    { Nombre: 'Gastón', Apellido: 'Nieto', Curso: 1, CursoNombre: '', Nota: 9 },
    {
      Nombre: 'Emmanuel',
      Apellido: 'Romero',
      Curso: 2,
      CursoNombre: '',
      Nota: 5,
    },
  ];
  private _cursos: ICurso[] = [];

  constructor(public Cursoservice: ListaCursosService) {}

  public listaAlumnos(): Observable<IAlumno[]> {
    return new Observable((observer) => {
      this.Cursoservice.listarCursos().subscribe((result) => {
        this._cursos = result;
        console.log(this._cursos);
        for (const iterator of this._listaAlumnos) {
          const itemClase = this._cursos.filter((item) => {
            return item.Id == iterator.Curso;
          });
          iterator.CursoNombre = itemClase[0].Nombre;
        }
      });
      setInterval(() => observer.next(this._listaAlumnos), 1000);
    });
  }

  // listaAlumnos() {
  //   return this._listaAlumnos.slice();
  // }

  public AbmAlumno(item: IAbmDialog) {
    if (item.operacionCod == 1) {
      this._listaAlumnos.push(item.alumno!);
    } else if (item.operacionCod == 2) {
      this._listaAlumnos[item.post].Nombre = item.alumno!.Nombre;
      this._listaAlumnos[item.post].Apellido = item.alumno!.Apellido;
      this._listaAlumnos[item.post].Curso = item.alumno!.Curso;
      this._listaAlumnos[item.post].Nota = item.alumno!.Nota;
    } else {
      this._listaAlumnos.splice(item.post, 1);
    }
  }
}
