import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, mergeMap, map, catchError } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import * as AlumnosActions from './alumnos.actions';
import { ListaAlumnoService } from '../../../core/service/lista-alumno/lista-alumno.service';
import { IAlumno } from '../../../shared/interface/alumno.interface';

@Injectable()
export class AlumnosEffects {
  cargarAlumnoss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AlumnosActions.cargarAlumnos),
      mergeMap(() =>
        this.serive
          .listaAlumnos()
          .pipe(
            map((alumnos: IAlumno[]) =>
              AlumnosActions.alumnosCargados({ alumnos: alumnos })
            )
          )
          .pipe(catchError((error) => [error]))
      )
    );
  });

  constructor(private actions$: Actions, public serive: ListaAlumnoService) {}
}
