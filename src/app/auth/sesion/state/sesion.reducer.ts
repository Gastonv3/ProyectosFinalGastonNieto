import { Action, createReducer, on } from '@ngrx/store';
import * as SesionActions from './sesion.actions';
import { IUsuario } from '../../../shared/interface/usuario.interface';

export const sesionFeatureKey = 'sesion';

export interface SesionState {
  sesionActiva: boolean;
  usuarioActivo?: IUsuario;
}

export const initialState: SesionState = {
  sesionActiva: false,
};

export const reducer = createReducer(
  initialState,
  on(SesionActions.cargarSesion, (state, { usuarioActivo }) => {
    return { ...state, sesionActiva: true, usuarioActivo: usuarioActivo };
  })
);
