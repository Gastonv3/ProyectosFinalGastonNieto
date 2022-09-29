import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAbmDialog } from 'src/app/shared/interface/AbmDialog.interface';
import { ICurso } from 'src/app/shared/interface/cursos.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListaCursosService {
  private api: string = environment.url;

  constructor(private http: HttpClient) {}

  public listarCursos(): Observable<ICurso[]> {
    return this.http.get<ICurso[]>(`${this.api}/curso`);
  }
  public cargarCurso(body: ICurso): Observable<ICurso> {
    return this.http.post<ICurso>(`${this.api}/curso`, body);
  }
  public modificarCurso(body: ICurso): Observable<ICurso> {
    return this.http.put<ICurso>(`${this.api}/curso/${body.id}`, body);
  }
}
