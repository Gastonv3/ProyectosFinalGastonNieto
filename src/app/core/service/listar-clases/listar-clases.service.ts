import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IAbmDialog } from 'src/app/shared/interface/AbmDialog.interface';

import { of } from 'rxjs';
import { IClases } from 'src/app/shared/interface/clases.interface';
import { ICurso } from 'src/app/shared/interface/cursos.interface';
import { ListaCursosService } from '../lista-cursos/lista-cursos.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListarClasesService {
  private api: string = environment.url;

  constructor(
    public Cursoservice: ListaCursosService,
    private http: HttpClient
  ) {}

  public listarClases(): Observable<IClases[]> {
    return this.http.get<IClases[]>(`${this.api}/clases`);
  }
  public cargarClases(body: IClases): Observable<IClases> {
    return this.http.post<IClases>(`${this.api}/clases`, body);
  }
  public modificarClases(body: IClases): Observable<IClases> {
    return this.http.put<IClases>(`${this.api}/clases/${body.id}`, body);
  }
}
