import { Action, createReducer, on } from '@ngrx/store';
import * as CursosActions from './cursos.actions';
import { ICurso } from '../../../shared/interface/cursos.interface';

export const cursosFeatureKey = 'cursos';

export interface CursosState {
  cargando: boolean;
  cursos?: ICurso[];
}

export const initialState: CursosState = {
  cargando: false,
};

export const reducer = createReducer(
  initialState,

  on(CursosActions.cargarCursos, (state) => {
    return { ...state, cargando: true };
  }),
  on(CursosActions.cursosCargados, (state, { cursos }) => {
    return { ...state, cargando: false, cursos: cursos };
  })
);
