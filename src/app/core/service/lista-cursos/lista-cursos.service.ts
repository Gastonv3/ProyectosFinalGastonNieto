import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAbmDialog } from 'src/app/shared/interface/AbmDialog.interface';
import { ICurso } from 'src/app/shared/interface/cursos.interface';

@Injectable({
  providedIn: 'root',
})
export class ListaCursosService {
  private _cursos: ICurso[] = [
    {
      Id: 1,
      Nombre: 'Angular',
      Descripcion: 'Nivel Inicial',
      Nivel: 0,
      Baja: 0,
    },
    {
      Id: 2,
      Nombre: 'Java',
      Descripcion: 'Nivel Inicial',
      Nivel: 0,
      Baja: 0,
    },
  ];

  constructor() {}

  public listarCursos(): Observable<ICurso[]> {
    return new Observable((observer) => {
      setInterval(() => observer.next(this._cursos), 1000);
    });
  }

  public procesarAbm(item: IAbmDialog) {
    if (item.operacionCod == 1) {
      this._cursos.push(item.cursos!);
    } else if (item.operacionCod == 2) {
      this._cursos[item.post].Nombre = item.cursos!.Nombre;
      this._cursos[item.post].Descripcion = item.cursos!.Descripcion;
      this._cursos[item.post].Nivel = item.cursos!.Nivel;
      this._cursos[item.post].Baja = item.cursos!.Baja;
    } else {
      this._cursos.splice(item.post, 1);
    }
  }
}
