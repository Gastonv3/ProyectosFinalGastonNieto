import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IAbmDialog } from 'src/app/shared/interface/AbmDialog.interface';

import { of } from 'rxjs';
import { IClases } from 'src/app/shared/interface/clases.interface';
import { ICurso } from 'src/app/shared/interface/cursos.interface';
import { ListaCursosService } from '../lista-cursos/lista-cursos.service';

@Injectable({
  providedIn: 'root',
})
export class ListarClasesService {
  private _clases: IClases[] = [
    {
      id: 1,
      dia: '2022-01-02',
      tema: 'TypeScript',
      nro: 1,
      descripcion: 'Introducción typescript',
      baja: 0,
      curso: 1,
      cursoNombre: '',
    },
    {
      id: 2,
      dia: '2022-01-02',
      tema: 'TypeScript II',
      nro: 1,
      descripcion: 'Introducción typescript parte 2',
      baja: 0,
      curso: 1,
      cursoNombre: '',
    },
  ];
  private _cursos: ICurso[] = [];
  constructor(public Cursoservice: ListaCursosService) {}

  public listarClases(): Observable<IClases[]> {
    return new Observable((observer) => {
      this.Cursoservice.listarCursos().subscribe((result) => {
        this._cursos = result;
        for (const iterator of this._clases) {
          const itemClase = this._cursos.filter((item) => {
            return item.Id == iterator.curso;
          });
          iterator.cursoNombre = itemClase[0].Nombre;
        }
      });

      setInterval(() => observer.next(this._clases), 1000);
    });
  }

  public procesarAbm(item: IAbmDialog) {
    if (item.operacionCod == 1) {
      this._clases.push(item.clase!);
    } else if (item.operacionCod == 2) {
      this._clases[item.post].dia = item.clase!.dia;
      this._clases[item.post].tema = item.clase!.tema;
      this._clases[item.post].nro = item.clase!.nro;
      this._clases[item.post].descripcion = item.clase!.descripcion;
      this._clases[item.post].baja = item.clase!.baja;
      this._clases[item.post].curso = item.clase!.curso;
    } else {
      this._clases.splice(item.post, 1);
    }
  }
}
