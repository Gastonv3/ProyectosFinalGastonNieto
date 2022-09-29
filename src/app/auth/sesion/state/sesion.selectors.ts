import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSesion from './sesion.reducer';
import { sesionFeatureKey } from './sesion.reducer';

export const selectSesionState = createFeatureSelector<fromSesion.SesionState>(
  fromSesion.sesionFeatureKey
);

export const selectSessionActivaState = createSelector(
  selectSesionState,
  (state: fromSesion.SesionState) => state.sesionActiva
);

export const selectUsuarioActivaState = createSelector(
  selectSesionState,
  (state: fromSesion.SesionState) => state.usuarioActivo
);
