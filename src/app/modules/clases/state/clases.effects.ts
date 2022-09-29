import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import * as ClasesActions from './clases.actions';
import { ListarClasesService } from 'src/app/core/service/listar-clases/listar-clases.service';
import { IClases } from '../../../shared/interface/clases.interface';

@Injectable()
export class ClasesEffects {
  cargarClasess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClasesActions.cargarClases),
      mergeMap(() =>
        this.serive
          .listarClases()
          .pipe(
            map((clases: IClases[]) =>
              ClasesActions.clasesCargados({ clases: clases })
            )
          )
          .pipe(catchError((error) => [error]))
      )
    );
  });

  constructor(private actions$: Actions, public serive: ListarClasesService) {}
}
