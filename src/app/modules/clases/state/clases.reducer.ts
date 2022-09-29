import { Action, createReducer, on } from '@ngrx/store';
import * as ClasesActions from './clases.actions';
import { IClases } from '../../../shared/interface/clases.interface';

export const clasesFeatureKey = 'clases';

export interface ClasesState {
  cargando: boolean;
  clases?: IClases[];
}

export const initialState: ClasesState = {
  cargando: false,
};

export const reducer = createReducer(
  initialState,

  on(ClasesActions.cargarClases, (state) => {
    return { ...state, cargando: true };
  }),

  on(ClasesActions.clasesCargados, (state, { clases }) => {
    return { ...state, cargando: false, clases: clases };
  })
);
