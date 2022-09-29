import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, mergeMap, map, catchError } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import * as CursosActions from './cursos.actions';
import { ListaCursosService } from 'src/app/core/service/lista-cursos/lista-cursos.service';
import { ICurso } from 'src/app/shared/interface/cursos.interface';

@Injectable()
export class CursosEffects {
  cargarCursos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursosActions.cargarCursos),
      mergeMap(() =>
        this.service
          .listarCursos()
          .pipe(
            map((cursos: ICurso[]) =>
              CursosActions.cursosCargados({ cursos: cursos })
            )
          )
          .pipe(catchError((error) => [error]))
      )
    );
  });

  constructor(private actions$: Actions, public service: ListaCursosService) {}
}
