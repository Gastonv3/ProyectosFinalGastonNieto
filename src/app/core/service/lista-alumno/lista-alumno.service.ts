import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAbmDialog } from 'src/app/shared/interface/AbmDialog.interface';
import { IAlumno } from 'src/app/shared/interface/alumno.interface';
import { ICurso } from 'src/app/shared/interface/cursos.interface';
import { environment } from 'src/environments/environment';
import { ListaCursosService } from '../lista-cursos/lista-cursos.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListaAlumnoService {
  private _listaAlumnos: IAlumno[] = [];
  private api: string = environment.url;

  constructor(
    private http: HttpClient,
    public Cursoservice: ListaCursosService
  ) {}

  get listado(): IAlumno[] {
    return this._listaAlumnos;
  }
  set listado(item: IAlumno[]) {
    this._listaAlumnos = item;
  }

  public listaAlumnos(): Observable<IAlumno[]> {
    return this.http.get<IAlumno[]>(`${this.api}/alumno`);
  }
  public cargarAlumno(body: IAlumno): Observable<IAlumno> {
    return this.http.post<IAlumno>(`${this.api}/alumno`, body);
  }
  public modificarAlumno(body: IAlumno): Observable<IAlumno> {
    return this.http.put<IAlumno>(`${this.api}/alumno/${body.id}`, body);
  }
  public eliminarAlumno(body: IAlumno): Observable<IAlumno> {
    return this.http.delete<IAlumno>(`${this.api}/alumno/${body.id}`);
  }
}
