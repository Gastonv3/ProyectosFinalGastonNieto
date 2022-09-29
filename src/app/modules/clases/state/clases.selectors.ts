import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromClases from './clases.reducer';

export const selectClasesState = createFeatureSelector<fromClases.ClasesState>(
  fromClases.clasesFeatureKey
);
export const selectCargandoState = createSelector(
  selectClasesState,
  (state: fromClases.ClasesState) => state.cargando
);

export const selectClasesCargandosState = createSelector(
  selectClasesState,
  (state: fromClases.ClasesState) => state.clases
);
