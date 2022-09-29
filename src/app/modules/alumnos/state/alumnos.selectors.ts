import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAlumnos from './alumnos.reducer';

export const selectAlumnosState =
  createFeatureSelector<fromAlumnos.AlumnosState>(
    fromAlumnos.alumnosFeatureKey
  );

export const selectCargandoState = createSelector(
  selectAlumnosState,
  (state: fromAlumnos.AlumnosState) => state.cargando
);

export const selectAlumnosCargandosState = createSelector(
  selectAlumnosState,
  (state: fromAlumnos.AlumnosState) => state.alumnos
);
