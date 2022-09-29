import { Action, createReducer, on } from '@ngrx/store';
import * as AlumnosActions from './alumnos.actions';
import { IAlumno } from '../../../shared/interface/alumno.interface';

export const alumnosFeatureKey = 'alumnos';

export interface AlumnosState {
  cargando: boolean;
  alumnos?: IAlumno[];
}

export const initialState: AlumnosState = {
  cargando: false,
};

export const reducer = createReducer(
  initialState,

  on(AlumnosActions.cargarAlumnos, (state) => {
    return { ...state, cargando: true };
  }),
  on(AlumnosActions.alumnosCargados, (state, { alumnos }) => {
    return { ...state, cargando: false, alumnos: alumnos };
  })
);
