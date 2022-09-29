import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCursos from './cursos.reducer';

export const selectCursosState = createFeatureSelector<fromCursos.CursosState>(
  fromCursos.cursosFeatureKey
);

export const selectCargandoState = createSelector(
  selectCursosState,
  (state: fromCursos.CursosState) => state.cargando
);

export const selectCursosCargandosState = createSelector(
  selectCursosState,
  (state: fromCursos.CursosState) => state.cursos
);
